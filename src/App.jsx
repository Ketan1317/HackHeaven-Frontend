import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import MainPage from './Components/MainPage';
import LandingPage from './Components/LandingPage';
import ForgetPassword from './Components/ForgotPassword';
import Profile from './Components/Profile';
import CustomDashboard from "./Pages/CustomDashBoard";
import DifficultySelector from './Pages/DifficultySelector.jsx';
import CustomWaiting from "./Pages/CustomWaiting";
import Custom1v1 from "./Components/Custom1v1.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path ="/" element = {<Custom1v1/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        <Route path ="/profile" element={<Profile/>}/>
        <Route path ="/customdashBoard" element={<CustomDashboard/>}/>
        <Route path = "/forgotpassword" element={<ForgetPassword/>}/>
        <Route path="/difficulty" element={<DifficultySelector />} />
        <Route path = "/waiting" element={<CustomWaiting/>}/>
        </Routes>
    </Router>
  );
};

export default App;
