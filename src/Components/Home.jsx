import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OpponentAvatar from "../assets/dev.jpg";
import logoNew from "../assets/logoNew.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BackgroundBeams } from "../ui/Beams-background";

const API_URL = "http://localhost:5001";

function Home() {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!username) {
      toast.error("Please enter a username");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/create-room`);
      const { room_id } = response.data;

      await axios.post(`${API_URL}/join-room/${room_id}`, { username });
      localStorage.setItem("username", username);
      navigate(`/room/${room_id}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create room.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!username || !roomCode) {
      toast.error("Please enter both username and room code");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${API_URL}/join-room/${roomCode}`, { username });
      localStorage.setItem("username", username);
      navigate(`/room/${roomCode}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to join room.");
    } finally {
      setIsLoading(false);
    }
  };

  const [user] = useState({
    name: "Ketan_1313",
    coins: 200,
    avatar: OpponentAvatar,
  });

  return (
     <div className="bg-[#0B1226] text-white w-full min-h-screen   font-sans overflow-x-hidden relative">
      <BackgroundBeams className="absolute inset-0" />
          <div className="absolute top-0 left-0 w-full h-full  -z-10 overflow-hidden">
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

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-lg bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg shadow-cyan-500/10 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-4">
            Common Room
          </h1>
          <p className="text-center text-gray-300 text-base mb-6">
            Join or create a real-time collaborative coding session.
          </p>

          <form className="mt-8 space-y-6">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
                disabled={isLoading}
                className="border-2 border-cyan-400/30 bg-white/10 text-white px-4 py-2 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all w-full"
              />
            </div>
            <div>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Room Code (to join)"
                disabled={isLoading}
                className="border-2 border-cyan-400/30 bg-white/10 text-white px-4 py-2 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all w-full"
              />
            </div>
            <div className="flex gap-4">
              {/* Create Room Button */}
              <button
                onClick={handleCreateRoom}
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform
      ${
        isLoading
          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
          : "bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 shadow-lg hover:shadow-xl hover:scale-105 text-white"
      }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loader" /> Creating Room...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Room
                  </span>
                )}
              </button>

              {/* Join Room Button */}
              <button
                onClick={handleJoinRoom}
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 transform
      ${
        isLoading
          ? "bg-gray-500 text-gray-300 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105 text-white"
      }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loader" /> Joining Room...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14m-7-7v14"
                      />
                    </svg>
                    Join Room
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
