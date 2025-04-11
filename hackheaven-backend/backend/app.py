from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
import uuid
import os
from dotenv import load_dotenv
import logging
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev')

# Configure CORS
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})
# Config SQLite DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'

db = SQLAlchemy(app)
jwt = JWTManager(app)


# Initialize SocketIO with CORS
socketio = SocketIO(app,
    cors_allowed_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    async_mode='threading',
    ping_timeout=60,
    ping_interval=25
)

# User model
class User(db.Model):
    __tablename__ = 'users'  # ensure this matches your actual table name
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    followers = db.Column(db.Integer, default=100)
    coins = db.Column(db.Integer, default=200)
    avatar = db.Column(db.String(200), nullable=True)  # path to avatar image

# Create tables
with app.app_context():
    db.create_all()
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        print("Received data:", data)  # Debug: Log incoming data
        
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not all([username, email, password]):
            return jsonify({"message": "Missing data"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"message": "User already exists"}), 400

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=email)
        return jsonify(access_token=token, user=username, email=email), 201
    
    except Exception as e:
        print(f"Error during signup: {str(e)}")  # Debug: Log errors
        return jsonify({"message": f"Server error: {str(e)}"}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return jsonify({"message": "Invalid credentials"}), 401

        token = create_access_token(identity=email)
        # Store user email in local storage for later use
        return jsonify(access_token=token, user=user.username, email=user.email), 200
    
    except Exception as e:
        print(f"Error during login: {str(e)}")
        return jsonify({"message": f"Server error: {str(e)}"}), 500


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify(logged_in_as=user.username)


@app.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        # Get the user's email from the JWT token
        current_user_email = get_jwt_identity()
        print(f"Getting profile for: {current_user_email}")
        
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            print("User not found")
            return jsonify({"message": "User not found"}), 404

        print("User found, returning profile")
        return jsonify({
            "username": user.username,
            "name": user.username,  # For compatibility with the frontend
            "email": user.email,
            "bio": user.bio or "",  # Handle None values
            "followers": user.followers,
            "coins": user.coins,
            "avatar": user.avatar or "/default/avatar.jpg"
        })
    except Exception as e:
        print(f"Error in get_profile: {str(e)}")
        return jsonify({"message": f"Server error: {str(e)}"}), 500

@app.route("/update-profile", methods=["POST"])
@jwt_required()
def update_profile():
    try:
        # Get the user's email from the JWT token
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()
        
        if not user:
            return jsonify({"message": "User not found"}), 404
        data = request.get_json()
        
        # Update user fields with data from the request
        if data.get("name"):
            user.username = data.get("name")  # Update username
        
        if data.get("email"):
            user.email = data.get("email")  # Update email
        
        if "bio" in data:
            user.bio = data.get("bio")  # Update bio
        
        db.session.commit()
        return jsonify({"message": "Profile updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error in update_profile: {str(e)}")
        return jsonify({"message": f"Failed to update profile: {str(e)}"}), 500

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        current_user_email = get_jwt_identity()
        # No server-side token invalidation here; client will remove the token
        return jsonify({"message": "Logged out successfully"}), 200
    except Exception as e:
        print(f"Error during logout: {str(e)}")
        return jsonify({"message": f"Server error: {str(e)}"}), 500


# Store active rooms and their participants
rooms = {}

@app.route('/')
def index():
    return "Common Coding Room Backend"

@app.route('/create-room', methods=['POST', 'OPTIONS'])
def create_room():
    logger.debug("Received create-room request")
    if request.method == 'OPTIONS':
        logger.debug("Handling OPTIONS request")
        return '', 200
    
    room_id = str(uuid.uuid4())[:8]  # Generate 8-character room code
    rooms[room_id] = {
        'participants': [],
        'code': '',
        'language': 'python'
    }
    logger.debug(f"Created room {room_id}")
    return jsonify({'room_id': room_id})

@app.route('/join-room/<room_id>', methods=['POST', 'OPTIONS'])
def join_room_route(room_id):
    logger.debug(f"Received join-room request for room {room_id}")
    if request.method == 'OPTIONS':
        logger.debug("Handling OPTIONS request")
        return '', 200
        
    if room_id not in rooms:
        logger.error(f"Room {room_id} not found")
        return jsonify({'error': 'Room not found'}), 404
    
    data = request.get_json()
    username = data.get('username')
    
    if not username:
        logger.error("Username not provided")
        return jsonify({'error': 'Username is required'}), 400
    
    # Check if username is already in participants
    if username not in rooms[room_id]['participants']:
        rooms[room_id]['participants'].append(username)
    
    logger.debug(f"User {username} joined room {room_id}")
    return jsonify({'status': 'success', 'participants': rooms[room_id]['participants']})

@socketio.on('connect')
def handle_connect():
    logger.debug('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    logger.debug('Client disconnected')

@socketio.on('join')
def on_join(data):
    room = data['room']
    username = data['username']
    
    if room not in rooms:
        logger.error(f"Room {room} not found during socket join")
        return
    
    join_room(room)
    logger.debug(f"Socket join: {username} joined room {room}")
    
    # Send existing code and language to the new user
    emit('initial_state', {
        'code': rooms[room]['code'],
        'language': rooms[room]['language'],
        'participants': rooms[room]['participants']
    })
    
    # Notify others
    emit('user_joined', {'username': username}, room=room, include_self=False)

@socketio.on('leave')
def on_leave(data):
    room = data['room']
    username = data['username']
    
    if room in rooms and username in rooms[room]['participants']:
        # Remove user from participants list
        rooms[room]['participants'].remove(username)
        logger.debug(f"User {username} removed from room {room} participants")
    
    leave_room(room)
    logger.debug(f"User {username} left room {room}")
    
    emit('user_left', {'username': username}, room=room)

@socketio.on('code_change')
def handle_code_change(data):
    room = data['room']
    code = data['code']
    username = data['username']
    
    if room in rooms:
        rooms[room]['code'] = code
        logger.debug(f"Code updated in room {room} by {username}")
        emit('code_updated', {'code': code, 'username': username}, room=room, include_self=False)
    else:
        logger.error(f"Room {room} not found during code_change")

@socketio.on('language_change')
def handle_language_change(data):
    room = data['room']
    language = data['language']
    username = data['username']
    
    if room in rooms:
        rooms[room]['language'] = language
        logger.debug(f"Language updated in room {room} to {language} by {username}")
        emit('language_updated', {'language': language, 'username': username}, room=room, include_self=False)
    else:
        logger.error(f"Room {room} not found during language_change")

@socketio.on('chat_message')
def handle_chat_message(data):
    room = data['room']
    message = data['message']
    username = data['username']
    
    logger.debug(f"Chat message in room {room} from {username}: {message}")
    emit('new_message', {'username': username, 'message': message}, room=room)

# WebRTC signaling handlers
@socketio.on('webrtc_offer')
def handle_webrtc_offer(data):
    room = data['room']
    from_user = data['from']
    to_user = data.get('to')
    
    logger.debug(f"WebRTC offer from {from_user} to {to_user} in room {room}")
    
    # If 'to' is specified, emit only to that specific user
    if to_user:
        emit('webrtc_offer', {
            'offer': data['offer'],
            'from': from_user,
            'to': to_user
        }, room=room)
    else:
        emit('webrtc_offer', {
            'offer': data['offer'],
            'from': from_user
        }, room=room, include_self=False)

@socketio.on('webrtc_answer')
def handle_webrtc_answer(data):
    room = data['room']
    from_user = data['from']
    to_user = data.get('to')
    
    logger.debug(f"WebRTC answer from {from_user} to {to_user} in room {room}")
    
    # If 'to' is specified, emit only to that specific user
    if to_user:
        emit('webrtc_answer', {
            'answer': data['answer'],
            'from': from_user,
            'to': to_user
        }, room=room)
    else:
        emit('webrtc_answer', {
            'answer': data['answer'],
            'from': from_user
        }, room=room, include_self=False)

@socketio.on('webrtc_ice')
def handle_webrtc_ice(data):
    room = data['room']
    from_user = data['from']
    to_user = data.get('to')
    
    logger.debug(f"WebRTC ICE candidate from {from_user} to {to_user} in room {room}")
    
    # If 'to' is specified, emit only to that specific user
    if to_user:
        emit('webrtc_ice', {
            'candidate': data['candidate'],
            'from': from_user,
            'to': to_user
        }, room=room)
    else:
        emit('webrtc_ice', {
            'candidate': data['candidate'],
            'from': from_user
        }, room=room, include_self=False)

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5001) 