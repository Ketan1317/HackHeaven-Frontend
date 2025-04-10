import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logoNew from "../assets/logoNew.png";
import OpponentAvatar from "../assets/dev.jpg";

const API_URL = "http://localhost:5001";

function Home() {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const storedUsername = localStorage.getItem("username") || "Guest";
  const user = {
    name: storedUsername,
    coins: 100,
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Please enter a username");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/create-room`);
      const { room_id } = response.data;

      await axios.post(`${API_URL}/join-room/${room_id}`, { username });
      localStorage.setItem("username", username);
      navigate(`/room/${room_id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create room.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!username || !roomCode) {
      setError("Please enter both username and room code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await axios.post(`${API_URL}/join-room/${roomCode}`, { username });
      localStorage.setItem("username", username);
      navigate(`/room/${roomCode}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to join room.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Common Coding Room</h1>
          <p className="mt-2 text-gray-600">Collaborate and code together in real-time</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg shadow-cyan-500/10 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-4">
            Common Room
          </h1>
          <p className="text-center text-gray-300 text-base mb-6">
            Join or create a real-time collaborative coding session.
          </p>

        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-cyan-400/30 bg-white/10 text-white px-4 py-2 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              placeholder="Enter Username"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="roomCode" className="block text-sm font-medium text-gray-700">
              Room Code (for joining)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="border-2 border-cyan-400/30 bg-white/10 text-white px-4 py-2 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              placeholder="Room Code (to join)"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? "Joining..." : "Join Room"}
            </button>
            <button
              type="submit"
              onClick={handleJoinRoom}
              disabled={isLoading}
              className="w-full px-4 py-2 text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
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