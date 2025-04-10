import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import sc1 from "./../assets/sc1.png";
import sc2 from "./../assets/sc2.png";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import logoNew from "./../assets/logoNew.png";
import { IoIosLogIn } from "react-icons/io";
import {
  FaHandsAslInterpreting,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { CiSquareMore } from "react-icons/ci";
import cpp from "./../assets/cpp.png";
import python from "./../assets/python.png";
import java from "./../assets/java.png";
import common from "./../assets/common.png";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const blobRefs = useRef([]);
  const vortexRef = useRef(null);
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Code...Compete...Connect",
    "Build Together, Learn Together",
    "Your Coding Journey Starts Here",
  ];

  // Spotlight effect tracking
  useEffect(() => {
    const header = headerRef.current;
    if (header) {
      const handleMouseMove = (e) => {
        const rect = header.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        header.style.setProperty("--x", `${x}%`);
        header.style.setProperty("--y", `${y}%`);
      };

      header.addEventListener("mousemove", handleMouseMove);
      return () => header.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Animate blobs with different delays
  useEffect(() => {
    blobRefs.current.forEach((blob, index) => {
      if (blob) {
        blob.style.animationDelay = `${index * 2}s`;
      }
    });
  }, []);

  // Vortex effect interaction
  useEffect(() => {
    const vortex = vortexRef.current;
    if (vortex) {
      const handleMouseMove = (e) => {
        const rect = vortex.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Tilt the vortex based on mouse position
        const tiltX = (y - 50) / 10;
        const tiltY = (x - 50) / 10;

        vortex.style.transform = `translate(-50%, -50%) rotate(${tiltX}deg) skew(${tiltY}deg, ${tiltX}deg)`;
      };

      vortex.addEventListener("mousemove", handleMouseMove);
      return () => vortex.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Text generation effect
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const timer = setTimeout(
      () => {
        const fullText = texts[textIndex];

        if (isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }

        if (!isDeleting && currentText === fullText) {
          // Pause at the end of typing
          setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, texts]);

  const handleLoginClick = () => navigate("/login");
  const handleSignUpClick = () => navigate("/signup");

  return (
    <div className="bg-[#0B1226] text-white w-full pb-10 min-h-screen font-mono overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (blobRefs.current[i] = el)}
              className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 animate-blob"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navbar with Spotlight Effect */}
      <header ref={headerRef} className="relative px-4 sm:px-6 lg:px-8">
        <div className="spotlight-effect" />
        <nav className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4 p-2 sm:gap-6">
            <img
              src={logoNew}
              alt="HackHeaven Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md"
            />
            <h1 className="text-3xl -ml-4  font-extrabold ">
              HackHeaven
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleSignUpClick}
              className="relative group cursor-pointer  bg-gradient-to-r from-[#1E90FF] to-[#4169E1] text-white px-5 py-2 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1E90FF] to-[#4169E1] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  ></path>
                </svg>
                Sign Up
              </span>
            </button>
            <button
              onClick={handleLoginClick}
              className="relative group cursor-pointer   bg-gradient-to-r from-[#00C896] to-[#00A878] text-white px-5 py-2 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00C896] to-[#00A878] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                <IoIosLogIn className="text-xl  font-semibold mr-2" />
                Login
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section with Vortex Effect */}
      <main className="relative z-10 container mx-auto px-4 py-16 h-screen flex items-center justify-center">
        <div className="vortex-container">
          <div ref={vortexRef} className="vortex">
            <div className="vortex-particles"></div>
          </div>
        </div>

        <div className="text-center space-y-10 relative z-10">
          <div className="text-generate-container">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-fadeInUp">
              <span className="text-generate">{currentText}</span>
              <span className="text-generate-cursor inline-block w-1 h-10 bg-cyan-400 animate-blink ml-1 align-middle"></span>
            </h2>
          </div>
          <p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeInUp"
            style={{ animationDelay: "0.2s" }}
          >
            Collaborate seamlessly in real-time with our cutting-edge code
            editor and interactive whiteboard designed for developers.
          </p>
          <div
            className="flex justify-center space-x-6 animate-fadeInUp"
            style={{ animationDelay: "0.4s" }}
          >
            <button onClick={() => navigate("/login")} className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-xs hover:shadow-cyan-500/50">
              Start Now
            </button>
          </div>
        </div>
      </main>

      {/* Screenshot Section */}
      <div className="relative mb-20 mt-24 -ml-52 px-4 flex justify-center items-center">
  {/* Glowing background pulse */}
  <div className="absolute w-[30%] h-[30%] rounded-full bg-gradient-to-r from-teal-400 via-indigo-500 to-violet-400 opacity-15 blur-3xl z-0 animate-pulse"></div>

  {/* Main screenshot (left) */}
  <div className="relative z-10 transform transition-all duration-500 hover:scale-[1.02] hover:rotate-[1deg] hover:translate-y-1">
    <img
      src={sc2}
      alt="screenshot 1"
      className="w-[65%] max-w-5xl rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] border border-indigo-800/50 animate-fadeIn"
    />
  </div>

  {/* Floating screenshot (right top) */}
  <div className="absolute top-12 left-[60%] z-20 transform transition-all duration-500 hover:scale-[1.03] hover:rotate-[2deg] hover:translate-y-2">
    <img
      src={sc1}
      alt="screenshot 2"
      className="w-[55%] max-w-5xl min-w-xl rounded-xl shadow-[0_16px_50px_-12px_rgba(0,0,0,0.5)] border border-indigo-500/50 opacity-95 animate-float"
      style={{ transform: "rotate(-2deg)" }}
    />
  </div>
</div>


      {/* Features Section */}
      <div className="px-6 md:px-12 mt-24 py-20 bg-gradient-to-br from-[#0B1226]/80 via-[#101B36]/80 to-[#0B1226]/80 backdrop-blur-md rounded-xl relative z-10 border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-fadeIn mb-16 relative z-10">
          Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 justify-items-center relative z-10">
          {[
            {
              icon: (
                <div className="flex items-center gap-3 animate-float">
                  <img
                    src={python}
                    className="w-10 hover:scale-110 transition-transform"
                    alt="python"
                  />
                  <img
                    src={java}
                    className="w-10 hover:scale-110 transition-transform"
                    alt="java"
                  />
                  <img
                    src={cpp}
                    className="w-10 hover:scale-110 transition-transform"
                    alt="cpp"
                  />
                </div>
              ),
              title: "Language Support",
              desc: "CodeHeaven supports multiple programming languages. Code your way — anytime, anywhere.",
              gradient: "from-blue-500/20 to-cyan-500/20",
            },
            {
              icon: (
                <IoGameControllerOutline className="text-5xl text-[#00C896] animate-float transition-transform hover:rotate-6" />
              ),
              title: "Gaming",
              desc: "Join our gaming community and connect with fellow gamers. Share experiences, strategies, and tips.",
              gradient: "from-emerald-500/20 to-teal-500/20",
            },
            {
              icon: (
                <MdOutlineRecordVoiceOver className="text-5xl text-[#00C896] animate-float transition-transform hover:scale-110" />
              ),
              title: "Voice Chat",
              desc: "Real-time conversations for collaboration and community building among devs and gamers.",
              gradient: "from-purple-500/20 to-pink-500/20",
            },
            {
              icon: (
                <FaHandsAslInterpreting className="text-5xl text-[#00C896] animate-float transition-transform hover:rotate-3" />
              ),
              title: "DSA",
              desc: "Practice questions and improve coding skills with DSA challenges tailored to all levels.",
              gradient: "from-red-500/20 to-orange-500/20",
            },
            {
              icon: (
                <CiSquareMore className="text-5xl text-[#00C896] animate-float transition-transform hover:scale-110" />
              ),
              title: "Community",
              desc: "Collaborate, share ideas, and network with developers and tech enthusiasts worldwide.",
              gradient: "from-indigo-500/20 to-blue-500/20",
            },
            {
              icon: (
                <img
                  src={common}
                  className="w-10 animate-float hover:scale-110 transition-transform"
                  alt="common"
                />
              ),
              title: "Common Room",
              desc: "Real-time room to collaborate, solve Leetcode, and code live with friends and strangers alike.",
              gradient: "from-cyan-500/20 to-blue-500/20",
            },
          ].map((feature, idx) => (
            <div
  key={idx}
  className="w-96 h-80 bg-[#111827]/70 backdrop-blur-md border border-cyan-500/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-xl shadow-cyan-500/5 hover:shadow-cyan-400/20 transition-all duration-500 animate-fadeInUp relative group"
  style={{
    animationDelay: `${idx * 100}ms`,
    animationFillMode: "both",
  }}
>
  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
  {/* <div className="absolute top-3 right-3 w-5 h-5 bg-white rounded-full opacity-30 animate-ping"></div> */}
  <div className="relative z-10">
    <div className="mb-6">{feature.icon}</div>
    <h3 className="text-2xl font-semibold mb-3 text-cyan-300 tracking-tight">
      {feature.title}
    </h3>
    <p className="text-gray-100 text-lg font-normal leading-relaxed tracking-wide">
      {feature.desc}
    </p>
  </div>
</div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer flex flex-col items-center justify-center gap-6 mt-24 mb-10 px-4 text-center border-t border-gray-700 pt-10 relative footer-animate">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] h-[2px] footer-border-animate opacity-80 blur-sm"></div>
        <h4 className="text-xl font-semibold text-gray-300 mb-2 relative z-10 footer-glow">
          Connect With Us
        </h4>
        <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-2xl relative z-10">
          <div className="relative group footer-icon-animate footer-hover-effect">
            <FaGithub className="hover:text-white cursor-pointer transition-transform hover:scale-125 duration-300" />
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
          </div>
          <div className="relative group footer-icon-animate footer-hover-effect">
            <FaLinkedin className="hover:text-white cursor-pointer transition-transform hover:scale-125 duration-300" />
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
          </div>
          <div className="relative group footer-icon-animate footer-hover-effect">
            <FaTwitter className="hover:text-white cursor-pointer transition-transform hover:scale-125 duration-300" />
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
          </div>
          <div className="relative group footer-icon-animate footer-hover-effect">
            <FaDiscord className="hover:text-white cursor-pointer transition-transform hover:scale-125 duration-300" />
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
          </div>
          <div className="relative group footer-icon-animate footer-hover-effect">
            <FaFacebook className="hover:text-white cursor-pointer transition-transform hover:scale-125 duration-300" />
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
          </div>
          <div className="relative group footer-icon-animate footer-hover-effect">
            <FaInstagram className="hover:text-white cursor-pointer transition-transform hover:scale-125 duration-300" />
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
          </div>
        </div>
        <p className="text-sm text-gray-500 font-semibold mt-4 relative z-10 copyright-pulse">
          &copy; 2023 HackHeaven. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;