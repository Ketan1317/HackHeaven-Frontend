import React, { useState, useEffect } from "react";
import Avatar from "../assets/dev.jpg";
import { CiPlay1 } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { FiFileText } from "react-icons/fi";

const Custom1v1 = () => {
  const [opponent, setOpponent] = useState({
    name: "Devyansh",
    coins: 1200,
    avatar: Avatar,
  });
  const [user, setUser] = useState({
    name: "Ketan Goyal",
    coins: 900,
    avatar: Avatar,
  });
  const [data, setData] = useState({
    difficulty: "Easy",
    title: "Reverse a String",
    description:
      "Write a function that takes a string as input and returns a new string with the characters in reverse order. This is a common string manipulation problem that helps practice string operations and character manipulation.",
    examples: {
      sample_test: "hello",
      sample_output: "olleh",
      sample_description: "Reverse 'hello' to 'olleh'.",
    },
    test_cases: [
      { test1: "", output1: "" },
      { test2: "a", output2: "a" },
      { test3: "racecar", output3: "racecar" },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Submission successful!");
    }, 2000);
  };

  const handleExit = () => {
    if (!showExitConfirm) {
      setShowExitConfirm(true);
      setTimeout(() => setShowExitConfirm(false), 3000);
    } else {
      // Handle actual exit (e.g., navigate back)
      window.history.back();
    }
  };

  return (
    <div className="bg-[#0B1226] text-white min-h-screen overflow-x-hidden relative font-sans">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[40%] left-[60%] w-96 h-96 bg-blue-600/20 rounded-full blur-2xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-2xl animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-6 h-20 shadow-md shadow-cyan-500/10 backdrop-blur-sm relative z-10">
        <div className="user flex items-center gap-4 transition-all duration-300 hover:scale-105">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full border-2 border-cyan-500/30 shadow-md"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <p>{user.name}</p>
              <p className="text-yellow-400">{user.coins} 🪙</p>
            </div>
            <div className="w-32 h-2 mt-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse-slow" />
          </div>
        </div>
        <div className="submit flex items-center gap-4 bg-gray-700/50 px-6 py-2 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-l"
            } text-white font-semibold transition-all duration-300 hover:scale-105`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              <>
                <CiPlay1 className="text-xl" />
                Submit
              </>
            )}
          </button>
          <div className="w-[1px] h-6 bg-gray-500" />
          <button
            onClick={handleExit}
            className={`text-xl transition-all duration-300 ${
              showExitConfirm ? "text-red-500 hover:text-red-700" : "text-white hover:text-gray-300"
            }`}
          >
            <IoExitOutline />
            {showExitConfirm && <span className="ml-2 text-sm">Confirm?</span>}
          </button>
        </div>
        <div className="opponent flex items-center gap-4 transition-all duration-300 hover:scale-105">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <p>{opponent.name}</p>
              <p className="text-yellow-400">{opponent.coins} 🪙</p>
            </div>
            <div className="w-32 h-2 mt-1 rounded-full bg-gradient-to-r from-red-600 to-pink-600 animate-pulse-slow" />
          </div>
          <img
            src={opponent.avatar}
            alt={opponent.name}
            className="w-12 h-12 rounded-full border-2 border-cyan-500/30 shadow-md"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex justify-center gap-6 p-6 mt-6">
        <div className="left w-[48vw] min-h-[calc(100vh-10rem)] bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-2 mb-6 bg-gray-700/50 px-4 py-2 rounded-xl text-white transition-all duration-300 hover:bg-gray-600/70">
            <FiFileText className="text-xl" />
            <h3 className="text-lg font-semibold">Problem Details</h3>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent transition-all duration-300 hover:text-teal-300">
            {data.title}
          </h1>
          <div
            className={`inline-block px-3 py-1 rounded-full font-semibold text-white text-center mb-4 transition-all duration-300 ${
              data.difficulty === "Easy"
                ? "bg-green-500 hover:bg-green-600"
                : data.difficulty === "Medium"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : data.difficulty === "Hard"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {data.difficulty}
          </div>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed transition-opacity duration-300 hover:opacity-90">
            {data.description}
          </p>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Example
          </h2>
          <div className="p-4 bg-gray-800/50 rounded-xl shadow-inner transition-all duration-300 hover:shadow-md">
            <p className="text-lg font-medium mb-2">Input: {data.examples.sample_test}</p>
            <p className="text-lg font-medium mb-2">Output: {data.examples.sample_output}</p>
            <p className="text-md text-gray-400">Explanation: {data.examples.sample_description}</p>
          </div>
          <h2 className="text-2xl font-bold mt-6 mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Test Cases
          </h2>
          <div className="space-y-2">
            {data.test_cases.map((test, index) => (
              <div
                key={index}
                className="p-3 bg-gray-800/50 rounded-xl shadow-inner transition-all duration-300 hover:bg-gray-700/70"
              >
                <p className="text-md">Test {index + 1}: {test[`test${index + 1}`]}</p>
                <p className="text-md">Output: {test[`output${index + 1}`]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="right w-[48vw] min-h-[calc(100vh-10rem)] flex flex-col gap-4">
          <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:shadow-xl">
            {/* Editor Placeholder */}
            <p className="text-center text-gray-400">Code Editor (Placeholder)</p>
          </div>
          <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:shadow-xl">
            {/* Output Placeholder */}
            <p className="text-center text-gray-400">Output Console (Placeholder)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom1v1;