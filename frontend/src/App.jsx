import React from "react";
import { Routes, Route } from "react-router-dom"; // No need for Router here
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import PrivateRouteAdmin from './components/PrivateRouteAdmin'
import LandingPage from "./pages/LandingPage/LandingPage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import AdminLogin from "./pages/Login/AdminLogin";
import AdminPage from "./pages/AdminDashboard/AdminPage";
import GigDetails from "./pages/GigDetails/GigDetails";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        

        {/* Protected Route for Home Page */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/messages"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/messages/:user1/:user2"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/gig-details"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        /> 
        <Route
          path="/home/post-gigs"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/notifications"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/profile"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/settings"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/apply/:id"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRouteAdmin>
              <AdminPage />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/gig-details/:gigId"
          element={
            <PrivateRouteAdmin>
              <GigDetails />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/home/messages/:user1/:user2"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Add any other routes here */}
      </Routes>
    </AuthProvider>
  );
};

export default App;
