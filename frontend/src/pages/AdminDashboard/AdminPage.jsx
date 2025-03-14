import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReportedGigs from "../../components/ReportedGigs";

const AdminPage = () => {
  const { AdminLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin"); // Remove user from localStorage
    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center mt-10">

      <h2>Admin Dashboard</h2>
      <ReportedGigs />
      <button onClick={handleLogout} className="bg-red-500 text-white p-2 mt-2">
        Logout
      </button>
    </div>
  );
};

export default AdminPage;
