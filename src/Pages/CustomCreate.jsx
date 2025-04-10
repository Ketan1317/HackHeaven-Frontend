// Custom.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoNew.png";
import avatar from "../../assets/avatar.jpg";
import OpponentAvatar from "../../assets/dev.jpg";
import DifficultySelector from "./DifficultySelector";

const Custom = () => {
  const [user, setUser] = useState({
    name: "Ketan_1313",
    coins: 200,
    avatar: avatar,
  });
  const [view, setView] = useState("main");
  const [roomCode, setRoomCode] = useState("");
  const [stakeAmount, setStakeAmount] = useState(50); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    setView("difficulty");
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomCode.trim() !== "") {
      navigate(`/room/${roomCode}`);
    } else {
      setErrorMessage("Please enter a valid room code!");
    }
  };

  return (
    <div className="bg-[#0B1226] text-white w-full min-h-screen font-[boldonse] overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[40%] left-[60%] w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-2xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-2xl animate-blob animation-delay-4000" />
      </div>

      <header className="flex justify-between items-center px-6 h-28 shadow-md shadow-cyan-500/10 backdrop-blur-sm relative z-10">
        <img
          src={logo}
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
              <span className="animate-spin">🪙</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex justify-center mt-24 items-center flex-grow px-4 overflow-hidden">
        {view === "main" ? (
          <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg shadow-cyan-500/10 animate-fadeIn">
            <h1 className="text-[35px] absolute mb-11 ml-20 -mt-4 text-center font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
              Custom Mode
            </h1>
            <p className="text-center mt-16 text-gray-300 text-base">
              Join an existing room or create your own to challenge your skills and compete with others!
            </p>
            <div className="flex mt-8 items-center justify-center gap-6">
              <form onSubmit={handleJoinRoom}>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="border-2 px-4 py-2 rounded-2xl w-72 transition-shadow duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
                  placeholder="Enter Room ID"
                />
              </form>
              <button
                onClick={handleJoinRoom}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white transition-transform duration-300 hover:scale-105"
              >
                Join
              </button>
            </div>
            {errorMessage && (
              <div className="mt-4 text-center text-red-500 font-semibold">
                {errorMessage}
              </div>
            )}
            <div className="flex items-center my-5">
              <div className="flex-grow h-px bg-white/20"></div>
              <span className="px-3 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-white/20"></div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Stake Amount:</label>
              <input
                type="range"
                min="10"
                max={user.coins}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-2">{stakeAmount} 🪙</div>
            </div>
            <button
              onClick={handleCreateRoom}
              className="w-full text-xl font-semibold rounded-2xl px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white transition-transform duration-300 hover:scale-105"
            >
              Create New Room
            </button>
          </div>
        ) : (
          <DifficultySelector initialStake={stakeAmount} />
        )}
      </main>
    </div>
  );
};

export default Custom;