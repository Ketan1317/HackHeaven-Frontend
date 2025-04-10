import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import OpponentAvatar from "../assets/dev.jpg";
import logoNew from "../assets/logoNew.png";


const Custom = () => {
  const [user, setUser] = useState({
    name: "Ketan_1313",
    coins: 200,
    avatar: avatar,
  });
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-[#0B1226] text-white font-family-[] w-full min-h-screen font-sans overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[40%] left-[60%] w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-2xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-2xl animate-blob animation-delay-4000" />
      </div>

      <header className="flex justify-between items-center px-6 h-28 shadow-md shadow-cyan-500/10 backdrop-blur-sm relative z-10">
        <img
          src={logoNew}
          onClick={() => navigate("/")}
          alt="HackHeaven"
          className="w-32 hover:scale-105 transition-transform duration-500"
        />
        <div className="flex items-center gap-5 mr-10 animate-fadeIn group">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-lg group-hover:shadow-cyan-400/50 transform transition-transform duration-300">
            <img
              src={OpponentAvatar}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-1 drop-shadow-md text-white transition-all duration-300">
              {user.name}
            </h1>
            <div className="flex items-center gap-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 px-4 py-2 rounded-xl text-xl font-bold shadow-inner shadow-black/30 transition-transform duration-300 transform">
              <span className="text-yellow-300">{user.coins}</span>
              <span>🪙</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex justify-center mt-24 items-center flex-grow px-4 overflow-hidden">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg shadow-cyan-500/10 animate-fadeIn">
          <h1 className="text-[35px] text-center font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-6">
            Custom Mode
          </h1>
          <p className="text-center text-gray-300 text-base mb-8">
            Join an existing room or create your own to challenge your skills!
          </p>
          <form onSubmit={(e) => { e.preventDefault(); navigate(`/room/${roomCode}`); }} className="flex items-center justify-center gap-4 mb-6">
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="border-2 px-4 py-2 rounded-2xl w-72 transition-shadow duration-300"
              placeholder="Enter Room ID"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white transition-transform duration-300 hover:scale-105"
            >
              Join
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-white/20"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-white/20"></div>
          </div>
          <button
            onClick={() => navigate('/customcreate')}
            className="w-full text-xl font-semibold rounded-2xl px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white transition-transform duration-300 hover:scale-95"
          >
            Create New Room
          </button>
        </div>
      </main>
    </div>
  );
};

export default Custom;