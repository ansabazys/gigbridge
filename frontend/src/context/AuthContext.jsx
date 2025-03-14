import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide user data and loading state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")))
  const navigate = useNavigate();

  // Check user authentication when the app loads (to handle refresh)
  useEffect(() => {
    // Fetch user from localStorage
    const storedUser = localStorage.getItem("user");
  

    if (storedUser) {
      // If user is in localStorage, parse and set it
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      // Fetch user if not in localStorage (token expired or no user session)
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/user/profile",
            {
              withCredentials: true, // Ensure cookies are sent
            }
          );

          if (response.data) {
            setUser(response.data); // Set user if authenticated
            localStorage.setItem("user", JSON.stringify(response.data)); // Save user in localStorage
          } else {
            console.error("No user data received from the API.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser(); // Fetch user data if not found in localStorage
    }
  }, []); // Empty dependency array ensures this runs only once on initial load


  // Register function
  const register = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        values,
        {
          withCredentials: true, // Ensure cookies are included in the request
        }
      );
      setUser(response.data); // Set user after registration
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user in localStorage
      navigate("/home"); // Redirect to home page after registration
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
    }
  };

  // Login function
  const login = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        values,
        {
          withCredentials: true, // Ensure cookies are included in the request
        }
      );
      localStorage.setItem("token", JSON.stringify(response.data.token))
      setUser(response.data); // Set user after login
      localStorage.setItem("user", JSON.stringify(response.data)); // Save user in localStorage
      navigate("/home"); // Redirect to home page after login
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
    }
  };

  const Adminlogin = async (username, password) => {

    console.log(username, password)
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/admin/login",
        {username: username, password: password},
        {
          withCredentials: true, // Ensure cookies are included in the request
        }
      );
      console.log(response)
      localStorage.setItem("admin", JSON.stringify(response.data.token))
      setAdmin(true)
      navigate("/admin"); // Redirect to home page after login
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
    }
  };

 

  // Logout function
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true, // Ensure cookies are included in the request
        }
      );
      setUser(null); // Clear user data after logout
      localStorage.removeItem("user"); // Remove user from localStorage
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, admin,  register, login, logout, Adminlogin }}>
      {children}
    </AuthContext.Provider>
  );
};
