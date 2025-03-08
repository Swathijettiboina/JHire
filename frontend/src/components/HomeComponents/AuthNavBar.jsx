import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import api from "../../api/axiosInstance";

const AuthNavbar = () => {
  const { user, setUser, setIsAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); 
      setUser(null);
      setIsAuthenticated(false);
      console.log("Logged out");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="mr-4">
        <h1 className="text-xl font-bold">JHire</h1>
      </Link>

      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.first_name}!</span>
            <Link to="/" className="mr-4">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register" className="bg-green-500 px-4 py-2 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default AuthNavbar;
