import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import logo from "../assets/logoNew.png";
import OpponentAvatar from "../assets/dev.jpg";
import { BackgroundBeams } from "../ui/Beams-background";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import { FaLink } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import user2 from "../assets/user2.jpg";

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
  const handleCopy = () => {
    navigator.clipboard.writeText("RoomID123").then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Timeout to reset the state
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpponent({
        name: "Devyansh",
        coins: 1200,
        avatar: user2,
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
    <div className="bg-[#0B1226] text-white w-full min-h-screen relative">
      <header className="flex justify-between items-center px-6 h-28 shadow-md shadow-cyan-500/10 backdrop-blur-sm z-10">
        <img
          src={logo}
          onClick={() => navigate("/")}
          alt="HackHeaven"
          className="w-32 hover:scale-105 transition-transform duration-300"
        />
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-lg">
            <img
              src={OpponentAvatar}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-xl text-xl font-bold shadow-inner">
              <span className="text-yellow-300">{user.coins}</span>
              <span>🪙</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative w-full h-[calc(100vh-7rem)] z-0 grid grid-cols-2 items-center px-10 gap-5">
        <BackgroundBeams className="absolute inset-0" />

        {/* User and Opponent Sections */}
        <div className="flex items-center justify-center gap-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg shadow-cyan-500/10 p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              {user.name}
            </h2>
            <p className="text-gray-400 italic text-md">"Code conqueror!"</p>
          </div>
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-cyan-500/30"
          />
        </div>
        <div className="flex items-center justify-center gap-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg shadow-cyan-500/10 p-6">
          {opponent ? (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  {opponent.name}
                </h2>
                <p className="text-gray-400 italic text-md">
                  "Bring on the heat!"
                </p>
              </div>
              <img
                src={opponent.avatar}
                alt="Opponent Avatar"
                className="w-24 h-24 rounded-full border-4 border-cyan-500/30"
              />
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                Waiting for Opponent
              </h2>
              <p className="text-gray-400">Share the room code to invite!</p>
            </div>
          )}
        </div>
        <div className="flex gap-5 justify-center items-center mt-10">
      <div
        className="p-3 bg-gray-800 hover:bg-cyan-500 text-white rounded-full shadow-lg hover:shadow-cyan-400/50 transition-transform transform hover:scale-110 cursor-pointer"
        onClick={handleCopy}
      >
        {isCopied ? (
          <TbCopyCheck size={30} className="animate-bounce" />
        ) : (
          <TbCopy size={30} />
        )}
      </div>

      <div
        className="p-3 bg-gray-800 hover:bg-purple-500 text-white rounded-full shadow-lg hover:shadow-purple-400/50 transition-transform transform hover:scale-110 cursor-pointer"
        onClick={() => console.log("Generate Link")}
      >
        <FaLink size={30} />
      </div>

      <div
        className="p-3 bg-gray-800 hover:bg-red-500 text-white rounded-full shadow-lg hover:shadow-red-400/50 transition-transform transform hover:scale-110 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ImExit size={30} />
      </div>
    </div>

        {/* Countdown Timer */}
        {opponent && (
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
    <h2 className="text-xl font-bold text-gray-300 mb-4">
      Game Starts In:
    </h2>
    <div className="relative flex items-center justify-center">
      <div className="text-6xl font-extrabold mt-4 ml-9 text-white animate-pulse transition-transform duration-500 ease-in-out">
        {countdown}
      </div>

      <div className="absolute flex items-center gap-2 mt-20">
        <div className="w-4 h-4 bg-cyan-500 rounded-full animate-bounce transition-all duration-300"></div>
        <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce delay-200 transition-all duration-300"></div>
        <div className="w-4 h-4 bg-cyan-300 rounded-full animate-bounce delay-400 transition-all duration-300"></div>
      </div>
    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default Waiting;
