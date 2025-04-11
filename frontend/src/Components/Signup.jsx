import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail, MdPerson } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logoNew from "./../assets/logoNew.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
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
  }, [formData, formSubmitted]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Name is required';
    } else if (formData.username.length < 2) {
      newErrors.username = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear backend error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError(""); // Clear previous errors
    
    if (validateForm()) {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5001/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          }),
        });

        const data = await response.json();
        console.log("Server response:", data);  // Debug: Log server response

        if (response.ok) {
          localStorage.setItem("token", data.access_token);
          alert("Signup successful!");
          navigate("/login");
        } else {
          setError(data.msg || "Signup failed");
        }
      } catch (err) {
        console.error("Fetch error:", err);  // Debug: Log fetch error
        setError("Failed to connect to the server. Please check if the backend is running.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLoginClick = () => {
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


      </div>

      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-y-hidden min-h-scre overflow-hidden">
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
            <h1 className="text-3xl font-extrabold -ml-4">
              HackHeaven
            </h1>
          </div>
        </Link>
        <div>
          <button
            onClick={handleLoginClick}
            className="relative group bg-gradient-to-r from-[#1E90FF] to-[#4169E1] text-white px-5 py-2 font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1E90FF] to-[#4169E1] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Login</span>
          </button>
        </div>
      </header>

      <main className="flex justify-center items-center mt-16 px-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-lg shadow-cyan-500/10 animate-fadeIn">
          <h1 className="text-3xl text-center mb-8 font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-xl">Create Account</h1>
          
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="flex items-center">
                <MdPerson className="absolute ml-3 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  className={`w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border ${
                    errors.username ? 'border-red-500 input-error' : 'border-white/20'
                  } focus:outline-none focus:ring-2 focus:ring-[#00C896]`}
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <div className="flex items-center">
                <FaLock className="absolute ml-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={`w-full pl-10 pr-10 py-2 rounded-lg bg-white/10 text-white border ${
                    errors.password ? 'border-red-500 input-error' : 'border-white/20'
                  } focus:outline-none focus:ring-2 focus:ring-[#00C896]`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 cursor-pointer text-xl text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              {!errors.password && formData.password && (
                <div>
                  <div className="mt-1">
                    <div className="flex items-center">
                      <div className={`w-1/4 h-1 rounded-full mr-1 ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div className={`w-1/4 h-1 rounded-full mr-1 ${/(?=.*[a-z])/.test(formData.password) ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div className={`w-1/4 h-1 rounded-full mr-1 ${/(?=.*[A-Z])/.test(formData.password) ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div className={`w-1/4 h-1 rounded-full ${/(?=.*\d)/.test(formData.password) ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Password strength indicator</p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="flex items-center">
                <FaLock className="absolute ml-3 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`w-full pl-10 pr-10 py-2 rounded-lg bg-white/10 text-white border ${
                    errors.confirmPassword ? 'border-red-500 input-error' : 'border-white/20'
                  } focus:outline-none focus:ring-2 focus:ring-[#00C896]`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-3 cursor-pointer text-xl text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
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
                  Creating Account...
                </span>
              ) : 'Sign Up'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#00C896] hover:underline cursor-pointer">Login</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;