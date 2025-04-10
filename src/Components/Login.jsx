import React, { useState, useEffect } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import logoNew from './../assets/logoNew.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(""); // For backend error messages
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  
  // Clear errors when user types
  useEffect(() => {
    if (formSubmitted) {
      validateForm();
    }
  }, [loginData, formSubmitted]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    
    // Clear backend error when user starts typing again
    if (error) setError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError(""); // Clear previous errors
    
    if (validateForm()) {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5001/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });

        const data = await response.json();
        console.log("Login response:", data); // Debug: Log server response

        if (response.ok) {
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("user", data.email); 
          alert("Login successful!");
          window.location.href = "http://localhost:5173/main";
        } else {
          setError(data.msg || "Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("Failed to connect to the server. Please check if the backend is running.");
      } finally {
        setIsLoading(false);
      }
    }
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
      </div>

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-[40%] left-[60%] w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-2xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-2xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
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
            onClick={handleSignUpClick}
            className="relative group bg-gradient-to-r from-[#1E90FF] to-[#4169E1] text-white px-5 py-2 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1E90FF] to-[#4169E1] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Sign Up</span>
          </button>
        </div>
      </header>

      <main className="flex justify-center items-center mt-16 px-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg shadow-cyan-500/10 animate-fadeIn">
          <h1 className="text-3xl text-center mb-8 font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-float drop-shadow-xl">HackHeaven</h1>
          
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          
          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <div className="relative">
              <div className="flex items-center">
                <MdEmail className="absolute ml-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border ${
                    errors.email ? 'border-red-500 input-error' : 'border-white/20'
                  } focus:outline-none focus:ring-2 focus:ring-[#00C896]`}
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <div className="flex items-center">
                <FaLock className="absolute ml-3 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className={`w-full pl-10 pr-10 py-2 rounded-lg bg-white/10 text-white border ${
                    errors.password ? 'border-red-500 input-error' : 'border-white/20'
                  } focus:outline-none focus:ring-2 focus:ring-[#00C896]`}
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                <div
                  className="absolute right-3 cursor-pointer text-xl text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              <div className="flex justify-end mt-1">
                <Link to="/forgotpassword" className="text-gray-400 text-sm hover:text-[#00C896] hover:underline cursor-pointer">Forgot password?</Link>
              </div>
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
                  Logging in...
                </span>
              ) : 'Login'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-white/20"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-white/20"></div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <FcGoogle className="text-2xl" />
            <span className="text-white font-medium">Continue with Google</span>
          </button>

          <p className="text-sm text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#00C896] hover:underline cursor-pointer">Sign Up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;