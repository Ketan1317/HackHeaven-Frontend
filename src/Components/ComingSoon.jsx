import React from "react";
import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-900 to-blue-600">
      <motion.div
        className="text-center text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h1
          className="text-5xl font-bold tracking-wider mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Coming Soon
        </motion.h1>
        <motion.p
          className="text-lg mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          We're working hard to bring something amazing to you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <svg
            className="w-24 h-24 mx-auto animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <svg
          className="absolute bottom-0 left-0 w-1/2 h-auto text-blue-700 opacity-70"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            d="M0,256L48,229.3C96,203,192,149,288,149.3C384,149,480,203,576,202.7C672,203,768,149,864,154.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <svg
          className="absolute top-0 right-0 w-1/3 h-auto text-blue-800 opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            d="M0,96L48,112C96,128,192,160,288,144C384,128,480,64,576,58.7C672,53,768,107,864,149.3C960,192,1056,224,1152,202.7C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
