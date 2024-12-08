import React from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import Register from "./pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="home" element={<Home />} />
    </Routes>
  );
};

export default App;
