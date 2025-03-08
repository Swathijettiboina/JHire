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

      <div className="flex space-x-4">
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.first_name}!</span>

            {/* Dynamic Dashboard Link Based on User Type */}
            {user.userType === "hr" ? (
              <>
                <Link to="/hr-dashboard" className="mr-4">HR Dashboard</Link>
                <Link to="/post-job" className="mr-4">Post Job</Link> {/* HR Only */}
              </>
            ) : (
              <>
                <Link to="/seeker-dashboard" className="mr-4">Seeker Dashboard</Link>
                <Link to="/alljobs" className="mr-4">Jobs</Link> {/* Seekers Only */}
              </>
            )}

            <Link to="/about" className="mr-4">About</Link>
            <Link to="/services" className="mr-4">Services</Link>
            
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
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
