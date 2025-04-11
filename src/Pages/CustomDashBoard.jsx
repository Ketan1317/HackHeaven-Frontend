import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import OpponentAvatar from "../assets/dev.jpg";
import logoNew from "../assets/logoNew.png";
import "react-toastify/dist/ReactToastify.css";
import { BackgroundBeams } from "../ui/Beams-background";

const API_URL = "http://localhost:5001";

function Home() {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const handleCreateRoom = async (e) => {
  //   e.preventDefault();
  //   if (!username) {
  //     toast.error("Please enter a username");
  //     setError("Please enter a username");
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     const response = await axios.post(`${API_URL}/create-room`);
  //     const { room_id } = response.data;

  //     await axios.post(`${API_URL}/join-room/${room_id}`, { username });
  //     localStorage.setItem("username", username);
  //     toast.success("Room created successfully!");
  //     navigate(`/room/${room_id}`);
  //   } catch (err) {
  //     const message = err.response?.data?.error || "Failed to create room.";
  //     toast.error(message);
  //     setError(message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleJoinRoom = async (e) => {
    e.preventDefault;
    navigate("/coming");
  }
  const handleCreateRoom =async (e) => {
    e.preventDefault;
    navigate("/coming");
  }

  // const handleJoinRoom = async (e) => {
  //   e.preventDefault();
  //   if (!username || !roomCode) {
  //     toast.error("Please enter both username and room code");
  //     setError("Please enter both username and room code");
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     await axios.post(`${API_URL}/join-room/${roomCode}`, { username });
  //     localStorage.setItem("username", username);
  //     toast.success("Joined room successfully!");
  //     navigate(`/room/${roomCode}`);
  //   } catch (err) {
  //     const message = err.response?.data?.error || "Failed to join room.";
  //     toast.error(message);
  //     setError(message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const [user] = useState({
    name: "Ketan_1313",
    coins: 200,
    avatar: OpponentAvatar,
  });

  return (
    <div className="bg-[#0B1226] text-white w-full min-h-screen font-sans overflow-x-hidden relative">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[40%] left-[60%] w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-2xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-2xl animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-6 h-28 shadow-md shadow-cyan-500/10 backdrop-blur-sm relative z-10">
        <img
          src={logoNew}
          onClick={() => navigate("/")}
          alt="HackHeaven"
          className="w-32 hover:scale-105 transition-transform duration-500 cursor-pointer"
        />
        <div className="flex items-center gap-5 mr-10 animate-fade-in group">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-lg group-hover:shadow-cyan-400/50 transition-transform duration-300">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-1 drop-shadow-md text-white transition-all duration-300">
              {user.name}
            </h1>
            <div className="flex items-center gap-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 px-4 py-2 rounded-xl text-xl font-bold shadow-inner shadow-black/30">
              <span className="text-yellow-300">{user.coins}</span>
              <span>🪙</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex justify-center mt-14 items-center mb-4 flex-grow px-4 overflow-hidden">
        <BackgroundBeams className="absolute inset-0" />
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg shadow-cyan-500/10 animate-fade-in">
          <h1 className="text-[35px] text-center font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-3">
            1v1 Battle ⚔️
          </h1>
          <p className="text-center text-gray-300 text-base mb-4">
            Compete and code together in real-time
          </p>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-cyan-400 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border-2 border-cyan-400/30 rounded-2xl text-white 
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 
                           transition-shadow duration-300 disabled:opacity-50"
                placeholder="Enter Username"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="roomCode"
                className="block text-sm font-medium text-cyan-400 mb-1"
              >
                Room Code (for joining)
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border-2 border-cyan-400/30 rounded-2xl text-white 
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 
                           transition-shadow duration-300 disabled:opacity-50"
                placeholder="Enter Room Code"
                disabled={isLoading}
              />
            </div>

            <button
              type="button"
              onClick={handleCreateRoom}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl 
             font-semibold transition-transform duration-300 hover:scale-105 hover:shadow-lg 
             border-2 border-green-500 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating Room..." : "Create Room"}
            </button>
            <div className="flex items-center">
              <div className="flex-grow h-px bg-white/20"></div>
              <span className="px-3 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-white/20"></div>
            </div>
            <button
              type="submit"
              onClick={handleJoinRoom}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-2xl 
             font-semibold transition-transform duration-300 hover:scale-105 hover:shadow-lg 
             border-2 border-blue-500 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Joining Room..." : "Join Existing Room"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
