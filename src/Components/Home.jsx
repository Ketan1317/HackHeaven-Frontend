import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5001';

function Home() {
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!username) {
      setError('Please enter a username');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Creating room...');
      const response = await axios.post(`${API_URL}/create-room`);
      console.log('Room created:', response.data);
      
      const { room_id } = response.data;
      console.log('Joining room:', room_id);
      
      await axios.post(`${API_URL}/join-room/${room_id}`, { username });
      console.log('Joined room successfully');
      
      // Store username in localStorage
      localStorage.setItem('username', username);
      
      navigate(`/room/${room_id}`);
    } catch (err) {
      console.error('Error creating/joining room:', err);
      setError(err.response?.data?.error || 'Failed to create room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!username || !roomCode) {
      setError('Please enter both username and room code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Joining room:', roomCode);
      await axios.post(`${API_URL}/join-room/${roomCode}`, { username });
      console.log('Joined room successfully');
      
      // Store username in localStorage
      localStorage.setItem('username', username);
      
      navigate(`/room/${roomCode}`);
    } catch (err) {
      console.error('Error joining room:', err);
      setError(err.response?.data?.error || 'Failed to join room. Please check the room code and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg border border-blue-700">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-300">Common Coding Room</h1>
          <p className="mt-2 text-gray-400">Collaborate and code together in real-time</p>
        </div>

        {error && (
          <div className="p-4 text-red-300 bg-red-900 rounded-md border border-red-700">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-300">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="roomCode" className="block text-sm font-medium text-blue-300">
              Room Code (for joining)
            </label>
            <input
              id="roomCode"
              type="text"
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              onClick={handleCreateRoom}
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating Room...' : 'Create New Room'}
            </button>
            <button
              type="submit"
              onClick={handleJoinRoom}
              disabled={isLoading}
              className="w-full px-4 py-2 text-blue-300 bg-gray-800 border border-blue-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Joining Room...' : 'Join Existing Room'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;