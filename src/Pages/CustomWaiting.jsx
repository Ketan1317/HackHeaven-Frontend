import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import logo from "../assets/logoNew.png";
import OpponentAvatar from "../assets/dev.jpg";
import { BackgroundBeams } from "../ui/Beams-background";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import { FaLink } from "react-icons/fa";
import { ImExit } from "react-icons/im";

const Waiting = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Ketan_1317",
    coins: 200,
    avatar: OpponentAvatar,
  });
  const [opponent, setOpponent] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [countdown, setCountdown] = useState(3); // Start countdown from 3
  const { state } = useLocation();
  const stakeAmount = state?.stakeAmount || 50;
  const difficulty = state?.difficulty || "Medium";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpponent({
        name: "Devyansh",
        coins: 1200,
        avatar: OpponentAvatar,
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;
    if (opponent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (opponent && countdown === 0) {
      navigate(`/custom`, { state: { stakeAmount, difficulty } });
    }
    return () => clearInterval(timer);
  }, [countdown, navigate, opponent, roomId, stakeAmount, difficulty]);

  return (
    <div className="bg-[#0B1226] text-white w-full min-h-screen overflow-x-hidden relative">
      <header className="flex justify-between items-center px-6 h-28 shadow-md shadow-cyan-500/10 backdrop-blur-sm relative z-10">
        <img
          src={logo}
          onClick={() => navigate("/")}
          alt="HackHeaven"
          className="w-32 hover:scale-105 transition-transform duration-300"
        />
        <div className="flex items-center gap-5 mr-10 animate-fadeIn">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-lg transition-all duration-300 hover:shadow-cyan-400/50">
            <img
              src={OpponentAvatar}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-1 drop-shadow-md transition-all duration-300">
              {user.name}
            </h1>
            <div className="flex items-center gap-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 px-4 py-2 rounded-xl text-xl font-bold shadow-inner shadow-black/30 transition-transform duration-300">
              <span className="text-yellow-300">{user.coins}</span>
              <span >🪙</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative w-full h-[calc(100vh-7rem)] z-0 flex flex-col items-center justify-between pb-10">
        <BackgroundBeams className="absolute inset-0" />
        <div className="flex w-full  max-w-7xl  items-center justify-center gap-7 px-4 animate-slideInTop mt-20">
          {/* User Section (Left) */}
          <div className="min-w-[40vw] max-w-[40vw] px-6 py-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg shadow-cyan-500/10 flex gap-7  items-center text-center">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-2">
                {user.name}
              </h2>
              <p className="text-gray-400 italic text-md mb-4">
                "Mastering code, one challenge at a time!"
              </p>
            </div>
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-32 ml-10 h-32 rounded-full border-4 border-cyan-500/30 shadow-md mb-4"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="h-8 w-px bg-gray-500"></div> {/* Top line */}
            <span className="text-gray-400 font-bold text-lg">VS</span>{" "}
            {/* VS text */}
            <div className="h-8 w-px bg-gray-500"></div> 
          </div>

          {/* Opponent Section (Right) */}
          <div className="min-w-[40vw] max-w-[40vw] px-6 py-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg shadow-cyan-500/10 flex gap-7 items-center text-center">
            {opponent ? (
              <>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-2">
                    {opponent.name}
                  </h2>
                  <p className="text-gray-400 italic text-md mb-4">
                    "Bringing the heat to the challenge!"
                  </p>
                </div>
                <img
                  src={opponent.avatar}
                  alt="Opponent Avatar"
                  className="w-32 ml-10 h-32 rounded-full border-4 border-cyan-500/30 shadow-md mb-4"
                />
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-2">
                    Waiting for Opponent
                  </h2>
                  <p className="text-gray-400 text-md mb-4">
                    Share the room code to invite someone!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Countdown Timer */}
        {opponent && (
          <div className="mt-10 text-center">
            <h2 className="text-xl font-bold text-gray-300 mb-2">
              Game Starts In:
            </h2>
            <div className="flex items-center justify-center h-screen">
            <div className="text-6xl font-extrabold text-white animate-pulse">
              {countdown}
            </div>
          </div>
          </div>
        )}

        {/* Footer Controls */}
        <div className="flex items-center justify-center gap-5 mt-4">
          <button
            className={`px-3 py-2 border-2 border-gray-500 bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-md shadow-md transition-all duration-300 hover:scale-105 ${
              isCopied ? "border-green-500" : ""
            }`}
            onClick={handleCopyCode}
          >
            {isCopied ? <TbCopyCheck size={20} /> : <TbCopy size={20} />}
          </button>
          <button className="px-3 py-2 border-2 border-gray-500 bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-md shadow-md transition-all duration-300 hover:scale-105">
            <FaLink size={20} />
          </button>
          <button
            className="px-3 py-2 border-2 border-gray-500 bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-md shadow-md transition-all duration-300 hover:scale-105"
            onClick={() => navigate(-1)}
          >
            <ImExit size={20} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Waiting;
