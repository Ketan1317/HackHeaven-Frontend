import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import MainPage from './Components/MainPage';
import LandingPage from './Components/LandingPage';
import ForgetPassword from './Components/ForgotPassword';
import Profile from './Components/Profile';
import CustomDashboard from "./Pages/CustomDashBoard"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        <Route path ="/profile" element={<Profile/>}/>
        <Route path ="/customdashBoard" element={<CustomDashboard/>}/>
        <Route path = "/forgotpassword" element={<ForgetPassword/>}/>
        </Routes>
    </Router>
  );
};

export default App;
