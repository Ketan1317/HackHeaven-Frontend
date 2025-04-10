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
    <div className="bg-[#0B1226] text-white min-h-screen font-sans overflow-hidden relative flex flex-col">
      {/* Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[40%] left-[60%] w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-2xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-2xl animate-blob animation-delay-4000" />
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 h-24 shadow-md shadow-cyan-500/10 backdrop-blur-sm">
        <img
          src={logoNew}
          onClick={() => navigate("/")}
          alt="HackHeaven"
          className="w-32 cursor-pointer hover:scale-105 transition-transform duration-300"
        />
        <div className="flex items-center gap-4 mr-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-lg hover:shadow-cyan-400/50 transition-all duration-300">
            <img src={OpponentAvatar} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <div className="flex items-center gap-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 px-3 py-1 rounded-xl text-lg font-semibold shadow-inner">
              <span className="text-yellow-300 animate-pulse">{user.coins}</span>
              <span>🪙</span>
            </div>
          </div>
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
            <div className="relative p-4 pl-12 mb-6 text-sm text-red-100 bg-gradient-to-r from-red-500/80 to-red-600/90 border-l-4 border-red-300 rounded-lg shadow-md shadow-red-800/30 animate-shake">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-200">
                ⚠️
              </span>
              <span className="font-semibold tracking-wide">{error}</span>
            </div>
          )}

          <form onSubmit={handleJoinRoom} className="flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-cyan-400/30 bg-white/10 text-white px-4 py-2 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              placeholder="Enter Username"
              disabled={isLoading}
            />
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="border-2 border-cyan-400/30 bg-white/10 text-white px-4 py-2 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              placeholder="Room Code (to join)"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg transition-transform duration-300 hover:scale-105"
            >
              {isLoading ? "Joining..." : "Join Room"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-white/20" />
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-white/20" />
          </div>

          <button
            onClick={handleCreateRoom}
            disabled={isLoading}
            className="w-full py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg transition-transform duration-300 hover:scale-105"
          >
            {isLoading ? "Creating Room..." : "Create New Room"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
