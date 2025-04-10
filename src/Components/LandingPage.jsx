import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/HackHeaven.png";
import sc1 from "./../assets/sc1.png";
import sc2 from "./../assets/sc2.png";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
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

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="bg-[#0B1226] text-white w-full pb-10 min-h-screen font-mono overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 opacity-20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[40%] left-[60%] w-96 h-96 bg-blue-600 opacity-20 rounded-full filter blur-2xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-20 rounded-full filter blur-2xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="navbar flex justify-between items-center px-6 py-4 shadow-md shadow-cyan-500/10">
        <img src={logo} className="w-44 -mt-7 animate-float" alt="logo" />
        <div className="flex -mt-12 gap-4">
          <button 
            onClick={handleSignUpClick}
            className="bg-[#1E90FF] hover:bg-[#187bcd] text-white px-5 py-2 font-semibold rounded-xl transition-all duration-300 hover:scale-105">
            Sign Up
          </button>
          <button 
            onClick={handleLoginClick}
            className="bg-[#00C896] hover:bg-[#00a87e] text-white px-5 py-2 font-semibold rounded-xl transition-all duration-300 hover:scale-105">
            Login
          </button>
        </div>
      </div>

      <div className="text-center mt-20 mb-12 px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-float drop-shadow-xl">
          Welcome to HACKHEAVEN
        </h1>
        <p className="mt-6 text-3xl md:text-4xl font-semibold text-gray-300 animate-bounce">
          Where Developers Meet and Coders Rise Together 🚀
        </p>
        <button 
          onClick={handleSignUpClick}
          className="mt-10 bg-gradient-to-r from-[#00C896] to-[#1E90FF] hover:from-[#00a87e] hover:to-[#187bcd] text-white text-lg font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all duration-500 ease-in-out animate-wiggle ring-2 ring-cyan-400/20 hover:ring-cyan-300/50">
          Start Now
        </button>
      </div>

      <div className="relative mb-7 flex justify-center items-center mt-20 px-4">
        <img
          src={sc1}
          alt="screenshot 1"
          className="w-[65%] max-w-5xl rounded-xl shadow-2xl border border-gray-700 animate-fadeIn"
        />
        <img
          src={sc2}
          alt="screenshot 2"
          className="absolute w-[65%] top-16 left-77 rounded-xl shadow-xl border border-gray-700 opacity-95 animate-float"
        />
      </div>

      {/* Features */}
      <div className="px-6 md:px-12 mt-24 py-20 bg-gradient-to-br from-[#0B1226] via-[#101B36] to-[#0B1226] rounded-xl">
        <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-fadeIn mb-16">
          Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {[{
              icon: (
                <div className="flex items-center gap-2 animate-float">
                  <img src={python} className="w-10" alt="python" />
                  <img src={java} className="w-10" alt="java" />
                  <img src={cpp} className="w-10" alt="cpp" />
                </div>
              ),
              title: "Language Support",
              desc: "CodeHeaven supports multiple programming languages. Code your way — anytime, anywhere.",
            },
            {
              icon: <IoGameControllerOutline className="text-4xl text-[#00C896] animate-float" />,
              title: "Gaming",
              desc: "Join our gaming community and connect with fellow gamers. Share experiences, strategies, and tips.",
            },
            {
              icon: <MdOutlineRecordVoiceOver className="text-4xl text-[#00C896] animate-float" />,
              title: "Voice Chat",
              desc: "Real-time conversations for collaboration and community building among devs and gamers.",
            },
            {
              icon: <FaHandsAslInterpreting className="text-4xl text-[#00C896] animate-float" />,
              title: "DSA",
              desc: "Practice questions and improve coding skills with DSA challenges tailored to all levels.",
            },
            {
              icon: <CiSquareMore className="text-4xl text-[#00C896] animate-float" />,
              title: "Community",
              desc: "Collaborate, share ideas, and network with developers and tech enthusiasts worldwide.",
            },
            {
              icon: <img src={common} className="w-10  animate-float" alt="common" />,
              title: "Common Room",
              desc: "Real-time room to collaborate, solve Leetcode, and code live with friends and strangers alike.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="w-80 h-64 bg-[#111827] border border-[#1E293B] rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-[#00C896]/30 transition duration-300 animate-fadeIn hover:scale-105"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-[#00C896]">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer flex flex-col items-center justify-center gap-6 mt-24 mb-10 px-4 text-center border-t border-gray-700 pt-10">
        <h4 className="text-xl font-semibold text-gray-300 mb-2">Connect With Us</h4>
        <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-2xl">
          {[FaGithub, FaLinkedin, FaTwitter, FaDiscord, FaFacebook, FaInstagram].map((Icon, idx) => (
            <Icon key={idx} className="hover:text-white cursor-pointer transition-transform hover:scale-125 duration-300" />
          ))}
        </div>
        <p className="text-sm text-gray-500 font-semibold mt-4">
          &copy; 2023 HackHeaven. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;