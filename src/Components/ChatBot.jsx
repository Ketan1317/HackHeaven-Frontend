import React, { useState, useRef, useEffect } from "react";
import { FaCopy, FaRobot, FaUser, FaPaperPlane } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Gemini AI client
const genAI = new GoogleGenerativeAI("AIzaSyAK9NpD3iJYzNJeEl8r_cuQI06rP3tU9j4"); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use a valid model name

const ChatBot = ({ messages: roomMessages, setMessages: setRoomMessages, message, setMessage, handleSendMessage }) => {
  const [botMessages, setBotMessages] = useState([
    { role: "ai", text: "Hey! Ask me anything about code. I'm Creeper 👨‍💻" },
  ]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom when botMessages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [botMessages]);

  // Focus input when not loading
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  // Function to handle sending messages
  const sendMessage = async () => {
    const sanitizedInput = message.trim();
    if (!sanitizedInput) return;

    // Add user message to chatbot's local state
    const userMessage = { role: "user", text: sanitizedInput };
    const updatedBotMessages = [...botMessages, userMessage];
    setBotMessages(updatedBotMessages);

    // Also send to room chat (if desired)
    handleSendMessage({ preventDefault: () => {}, target: { value: sanitizedInput } });

    setMessage(""); // Clear input immediately
    setLoading(true);

    try {
      // Enhanced context for code-specific responses
      const prompt = `
        You are Creeper, a coding assistant built into a collaborative environment called Common Room, where users join to teach and learn code together.\n\nYou respond like a sharp, experienced Software Development Engineer (SDE) — practical, precise, and direct.\n\nTone and style:\n• Confident, efficient, and minimalistic — no unnecessary chatter\n• Respectful and helpful — you're here to enable users, not lecture\n• Think “SDE in a team Slack channel helping a teammate”\n\nResponse format:\n• Provide clean, working code examples when applicable\n• Explain only what’s necessary — skip the fluff\n• Use bullet points or short explanations where needed\n• Don’t assume the user is a beginner unless they ask for basics\n\nIf a request is unclear or ambiguous, ask for specifics — don’t guess.\n\nSample requests users may ask:\n• “Give me a Python one-liner to flatten a list of lists.”\n• “What’s the time complexity of merge sort?”\n• “How to debounce a function in JavaScript?”\n• “Write a REST API endpoint in Flask for user login.
        User Query: "${sanitizedInput}"
      `;

      // Call the Gemini API
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();

      const aiResponse = responseText || "Sorry, I couldn't process that.";
      setBotMessages([...updatedBotMessages, { role: "ai", text: aiResponse }]);
      // Optionally add AI response to room chat
      setRoomMessages((prev) => [...prev, { username: "CreeperBot", message: aiResponse }]);
    } catch (error) {
      console.error("Error with Gemini API:", error);
      const errorMessage = "Oops! Something went wrong 😓. Check your API key or try again.";
      setBotMessages([...updatedBotMessages, { role: "ai", text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleInputChange = (e) => {
    // Sanitize input: remove excessive whitespace and control characters
    const cleanInput = e.target.value.replace(/[\n\r\t]+/g, " ").replace(/[^\x20-\x7E]+/g, "").trimStart();
    setMessage(cleanInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
        <div className="flex items-center">
          <FaRobot className="text-cyan-400 mr-2 w-6 h-6" />
          <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Creeper CodeBot
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-3 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-800">
        {botMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 p-3 rounded-lg max-w-[85%] ${
              msg.role === "user"
                ? "bg-cyan-700/80 ml-auto text-right animate-slide-left"
                : "bg-gray-800 mr-auto animate-slide-right"
            } transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/30`}
          >
            <div className="p-1 rounded-full bg-opacity-20 mr-1">
              {msg.role === "user" ? (
                <FaUser className="w-4 h-4 text-cyan-300" />
              ) : (
                <FaRobot className="w-4 h-4 text-cyan-300" />
              )}
            </div>
            <div className="flex-1 whitespace-pre-wrap break-words">{msg.text}</div>
            <button
              onClick={() => copyToClipboard(msg.text, idx)}
              className={`text-gray-400 hover:text-cyan-300 transition-colors duration-200 p-1 ${
                copied === idx ? "text-green-400" : ""
              }`}
              title={copied === idx ? "Copied!" : "Copy message"}
            >
              <FaCopy className="w-4 h-4" />
            </button>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-gray-800/80 max-w-[85%] mr-auto animate-fade-in">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
            <span className="text-cyan-300 font-medium">Creeper is coding...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative mt-2">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={2}
          className="w-full p-4 pr-16 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 resize-none"
          placeholder="Ask a code-related question..."
        />
        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
          className={`absolute right-3 bottom-3 p-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-all duration-300 ${
            loading || !message.trim()
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105 hover:shadow-md hover:shadow-cyan-600/50"
          }`}
        >
          <FaPaperPlane className={`w-5 h-5 ${loading ? "animate-pulse" : ""}`} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;