import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login , Adminlogin, admin} = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      Adminlogin(emailOrUsername, password)
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  console.log(admin)

  useEffect(()=> {
    admin ? navigate("/admin") : navigate("/adminlogin")
  },[])

  return (
    <div className="flex flex-col items-center mt-10">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col">
        <input
          type="text"
          placeholder={"Username"}
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          className="border p-2 mt-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mt-2"
        />
        
        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
