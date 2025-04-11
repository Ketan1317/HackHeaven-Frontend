import React from "react";
import logoNew from "./../assets/logoNew.png";
import { useNavigate, NavLink } from "react-router-dom";
import { FlipWords } from "../UI/Flip-words";
import { SparklesCore } from "../UI/sparkles";
import { BackgroundBeamsWithCollision } from "../UI/background-beams-with-collisions";

const MainPage = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Common Room",
      desc: "Collaborate & solve DSA problems in real time with others.",
      icon: "🤝",
      border: "border-cyan-400",
    },
    {
      title: "1v1 Battle",
      desc: "Challenge others to coding duels and earn rewards.",
      icon: "⚔️",
      border: "border-pink-500",
    },
    {
      title: "Profile",
      desc: "Track your growth, stats, and achievements.",
      icon: "📈",
      border: "border-purple-500",
    },
  ];
  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // If no token exists, just redirect to login
      localStorage.removeItem("user"); // Clear user data if present
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear token and user data from localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed:", await response.json());
        // Optionally force logout on client side even if server fails
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Clear token and redirect even if the request fails
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const flipWords = [
    "Collaborate with Peers",
    "Code Together",
    "Compete Globally",
    "Conquer Challenges",
    "Create Magic",
  ];

  

  return (
    <div className="bg-[#0B1226] text-white min-h-screen font-mono overflow-x-hidden">
      <nav className="flex justify-between items-center px-10 h-24 shadow-2xl shadow-cyan-500/20 z-50 backdrop-blur-md">
        <img
          src={logoNew}
          alt="HackHeaven"
          className="w-28  hover:scale-105 transition-transform duration-500 "
        />

        {/* Navigation Items */}
        <ul className="flex gap-12 -ml-7 text-2xl font-semibold">
          <li className="relative group cursor-pointer">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `inline-block transition-all duration-500 ease-in-out
         px-2 py-1 rounded-md
         ${
           isActive
             ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
             : "text-white"
         }
         group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r 
         group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 
         group-hover:drop-shadow-[0_0_0.35rem_purple]
         hover:scale-110`
              }
            >
              Common Room
            </NavLink>
            <span
              className="absolute left-2/12 bottom-0.5 -translate-x-17/2 h-[2px] w-0 bg-gradient-to-r 
                 from-cyan-400 via-fuchsia-400 to-pink-400 
                 rounded-full transition-all duration-500 
                 group-hover:w-[90%] animate-pulse"
            ></span>
          </li>

          <li className="relative group cursor-pointer">
            <NavLink
              to="/customdashBoard"
              className={({ isActive }) =>
                `inline-block transition-all duration-500 ease-in-out
         px-2 py-1 rounded-md
         ${
           isActive
             ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
             : "text-white"
         }
         group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r 
         group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 
         group-hover:drop-shadow-[0_0_0.35rem_purple]
         hover:scale-110`
              }
            >
              1v1 Battle
            </NavLink>
            <span
              className="absolute left-2/12 bottom-0.5 -translate-x-17/2 h-[2px] w-0 bg-gradient-to-r 
                 from-cyan-400 via-fuchsia-400 to-pink-400 
                 rounded-full transition-all duration-500 
                 group-hover:w-[90%] animate-pulse"
            ></span>
          </li>

          <li className="relative group cursor-pointer">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `inline-block transition-all duration-500 ease-in-out
         px-2 py-1 rounded-md
         ${
           isActive
             ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
             : "text-white"
         }
         group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r 
         group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400 
         group-hover:drop-shadow-[0_0_0.35rem_purple]
         hover:scale-110`
              }
            >
              Profile
            </NavLink>
            <span
              className="absolute left-2/12 bottom-0.5 -translate-x-17/2 h-[2px] w-0 bg-gradient-to-r 
                 from-cyan-400 via-fuchsia-400 to-pink-400 
                 rounded-full transition-all duration-500 
                 group-hover:w-[90%] animate-pulse"
            ></span>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-gradient-to-br from-red-600 via-rose-600 to-red-800 hover:from-red-500 hover:to-red-700 
               px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-110 
               transition-all duration-500 hover:shadow-red-500/40
               text-white"
        >
          Logout
        </button>
      </nav>

      {/* Hero Section with Beams */}
      <BackgroundBeamsWithCollision className="hero-container relative px-12 py-24 text-center overflow-hidden bg-gradient-to-br from-[#0B1226] via-[#0F172A] to-[#1E293B] rounded-xl shadow-2xl mb-20">
        <div className="relative z-10">
          <div className="absolute inset-0 overflow-hidden">
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={100}
              className="h-full w-full"
              particleColor="#FFFFFF"
              speed={1.5}
            />
          </div>
          <div className="hero-glow"></div>
          <h1 className="hero-title animate-fadeInUp bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-xl hover:scale-105 transition-transform duration-500">
            Welcome to HackHeaven 🚀
          </h1>
          <FlipWords
  words={flipWords}
  duration={2500}
  className="mt-6 mb-12 text-2xl md:text-3xl font-semibold text-transparent 
    bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 
    tracking-wide [text-shadow:_0_1px_3px_rgba(34,211,238,0.2)] 
    animate-fade-in relative z-20"
/>
          <p className="hero-subtitle text-gray-300 animate-fadeInUp delay-200">
            Choose a{" "}
            <span className="text-cyan-400 font-semibold">battle mode</span>,
            join the{" "}
            <span className="text-purple-400 font-semibold">Common Room</span>,
            or sharpen your skills in exciting{" "}
            <span className="text-pink-400 font-semibold">1v1 matchups</span>.
            Let's get you coding, collaborating, and conquering!
          </p>
          <div className="mt-10 overflow-hidden">
            <marquee className="text-lg text-cyan-400 font-semibold tracking-wider animate-fadeIn delay-500">
              👾 Battle With Peers • 💬 Collaborate in Real-Time • 🧠 Solve DSA
              Challenges Together • 🔥 Earn Coins & Climb the Leaderboard!
            </marquee>
          </div>
          <div className="hero-buttons animate-fadeInUp delay-500">
            <button onClick={() => navigate("/home")} className="hero-button hero-button-primary">
              Enter Common Room
            </button>
            <button onClick={() => navigate("/customdashboard")} className="hero-button hero-button-secondary">
              1v1 Battle
            </button>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 px-12 relative z-10">
        {features.map(({ title, desc, icon, border }, idx) => (
          <div
            key={idx}
            className={`relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#111827] p-6 rounded-3xl shadow-lg hover:scale-105 hover:-rotate-1 transition-transform duration-500 border-2 ${border} animate-fadeInUp`}
          >
            <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full opacity-30 animate-ping" />
            <h2 className="text-3xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
              {icon} {title}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Announcement */}
      <div className="mt-20 px-12 animate-fadeInUp relative z-10">
        <h2
          className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500
             animate-fadeInUp transition-all duration-700 ease-out hover:scale-105 hover:brightness-110"
        >
          🚨 Latest Announcement
        </h2>
        <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] border-2 border-cyan-400 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-500">
          <p className="text-lg text-gray-300 leading-relaxed tracking-wide">
            <span className="text-yellow-400 animate-bounce">🔥</span>{" "}
            <span className="font-semibold text-white">
              New Weekly Code War
            </span>{" "}
            starts this <span className="text-pink-400">Friday</span>! Battle
            for <span className="text-cyan-400">glory</span>,{" "}
            <span className="text-yellow-300">coins</span>, and exclusive{" "}
            <span className="text-purple-300">ranks</span>. Get ready! ⚡
          </p>
        </div>
      </div>

      <footer className="relative z-10 mt-24 px-4 py-10 text-center text-white animate-fadeInUp transition-all duration-700 ease-out">
        {/* Separator Glow Line */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-[90%] h-[4px] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 opacity-30 blur-sm animate-pulse" />

        {/* Floating Color Aura (Optional but Cool) */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[60%] h-6 bg-gradient-to-r from-cyan-500/30 via-pink-500/30 to-purple-500/30 blur-2xl rounded-full animate-float" />

        {/* Footer Content */}
        <div className="space-y-4 relative z-10">
          <p className="text-lg font-medium tracking-wide transition hover:text-white animate-slide-in-up">
            © {new Date().getFullYear()}{" "}
            <span className="text-cyan-400 font-bold">HackHeaven</span> • Built
            for coders, by coders 💻
          </p>

          <nav aria-label="Footer Navigation">
            <ul className="flex justify-center gap-8 text-md font-semibold">
              {["About", "Privacy", "Support"].map((link, i) => (
                <li
                  key={i}
                  className="transform transition-all duration-500 hover:scale-110 hover:text-cyan-400"
                >
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
