import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoNew from "../assets/logoNew.png";
import OpponentAvatar from "../assets/dev.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackgroundBeams } from "../ui/Beams-background";

const DifficultySelector = ({ initialStake, onConfirm }) => {
  const [difficulty, setDifficulty] = useState("easy");
  const [stakeAmount, setStakeAmount] = useState(initialStake);
  const navigate = useNavigate();

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };
  const [user, setUser] = useState({
    name: "Ketan_1313",
    coins: 200,
    avatar: OpponentAvatar,
  });

  const handleStakeChange = (e) => {
    setStakeAmount(parseInt(e.target.value));
  };

  const handleConfirmSelection = () => {
    if (onConfirm) {
      onConfirm({ difficulty, stakeAmount });
    }
    toast.success(`Room Created: ${difficulty} - ${stakeAmount} 🪙`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("Difficulty:", difficulty, "Stake:", stakeAmount);
  };

  return (
    <div className="bg-[#0B1226] text-white w-full min-h-screen font-sans overflow-x-hidden relative">
      <ToastContainer />
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

      <main className="flex justify-center mt-18 items-center flex-grow px-4 overflow-hidden">
        <BackgroundBeams className="absolute inset-0" />
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg shadow-cyan-500/10 animate-fadeIn">
          <h1 className="text-[35px] text-center font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-5">
            Select Difficulty
          </h1>
          <p className="text-center text-md text-gray-300 mb-4">
            Choose your difficulty level and stake amount to create a room!
          </p>
          <div className="mb-6">
            <label className="block mb-2 font-bold text-xl tracking-wide bg-gradient-to-r from-teal-400/50 to-cyan-500/50 bg-clip-text text-transparent drop-shadow-md transition-colors duration-300 hover:text-teal-300">
              Difficulty Level:
            </label>
            <div className="relative">
              <select
                value={difficulty}
                onChange={handleDifficultyChange}
                className="w-full px-5 py-3 rounded-2xl bg-gradient-to-br from-[#0F172A]/80 via-[#1E293B]/80 to-[#111827]/80 text-white border border-cyan-500/20 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 hover:shadow-xs hover:shadow-cyan-500/30 hover:scale-105 appearance-none pr-10"
              >
                <option value="easy" className="bg-[#0B1226] text-white">
                  Easy
                </option>
                <option value="medium" className="bg-[#0B1226] text-white">
                  Medium
                </option>
                <option value="hard" className="bg-[#0B1226] text-white">
                  Hard
                </option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
                <svg
                  className="w-6 h-6 transition-transform duration-500 ease-in-out transform group-hover:rotate-180 group-hover:scale-110 text-cyan-400 hover:text-cyan-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-xl font-semibold mb-2">
              Stake Amount:
            </label>
            <input
              type="range"
              min="10"
              max="200" // Adjust based on user's coins
              value={stakeAmount}
              onChange={handleStakeChange}
              className="w-full text-xl font-semibold"
            />
            <div className="text-center mt-2">{stakeAmount} 🪙</div>
          </div>
          <button
            onClick={() => {
              handleConfirmSelection();
              navigate("/waiting");
            }}
            className="w-full text-xl font-semibold rounded-2xl px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white transition-transform duration-300 hover:scale-105"
          >
            Confirm Selection
          </button>
        </div>
      </main>
    </div>
  );
};

export default DifficultySelector;
