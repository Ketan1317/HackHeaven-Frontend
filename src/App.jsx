import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import MainPage from './Components/MainPage';
import LandingPage from './Components/LandingPage';
import ForgetPassword from './Components/ForgotPassword';
import Profile from './Components/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/forget-pass" element={<ForgetPassword />} />
        <Route path ="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
};

export default App;
