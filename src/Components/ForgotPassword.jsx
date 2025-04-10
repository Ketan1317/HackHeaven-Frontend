import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import logoNew from './../assets/logoNew.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateEmail()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        
        // Navigate back to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }, 1500);
    }
  };
  
  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="bg-[#0B1226] text-white w-full min-h-screen pb-10 font-mono overflow-x-hidden relative">
      {/* Meteor Effect */}
      <div className="meteor-container">
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
        <div className="meteor-effect"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-[40%] left-[60%] w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-2xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-2xl animate-blob animation-delay-4000"></div>
      </div>

       <header className="relative flex justify-between items-center px-4 sm:px-6 lg:px-8 flex-shrink-0">
              <Link to="/">
                <div className="flex items-center gap-4 p-2 sm:gap-6">
                  <img
                    src={logoNew}
                    alt="HackHeaven Logo"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md"
                  />
                  <h1 className="text-3xl -ml-4 font-extrabold ">
                    HackHeaven
                  </h1>
                </div>
              </Link>
              <div>
                <button
                  onClick={handleBackToLogin}
                  className="relative group bg-gradient-to-r from-[#1E90FF] to-[#4169E1] text-white px-5 py-2 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1E90FF] to-[#4169E1] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">Login</span>
                </button>
              </div>
            </header>

      <main className="flex justify-center items-center mt-16 px-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg shadow-cyan-500/10 animate-fadeIn">
          <h1 className="text-3xl text-center mb-2 font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-float drop-shadow-xl">Reset Password</h1>
          <p className="text-center text-gray-400 mb-8">Enter your email to receive a password reset link</p>
          
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-500 mb-2">Email Sent!</h3>
              <p className="text-gray-300 mb-4">We've sent a password reset link to your email address.</p>
              <p className="text-gray-400 text-sm">Redirecting to login page...</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <div className="flex items-center">
                  <MdEmail className="absolute ml-3 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border ${
                      error ? 'border-red-500 input-error' : 'border-white/20'
                    } focus:outline-none focus:ring-2 focus:ring-[#00C896]`}
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 mt-4 bg-gradient-to-r from-[#00C896] to-[#1E90FF] hover:from-[#00a87e] hover:to-[#187bcd] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Reset Link'}
              </button>
            </form>
          )}

          <p className="text-sm text-center text-gray-400 mt-6">
            Remember your password?{" "}
            <Link to="/login" className="text-[#00C896] hover:underline cursor-pointer">Back to Login</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword; 