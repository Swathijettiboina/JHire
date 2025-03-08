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
    <nav className="bg-green-700 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl flex px-5 gap-5 font-bold tracking-wide hover:text-green-300 transition">
        <img src="logo.avif" alt="Logo" className="w-10 h-10 mb-4 rounded-full" />
          <p>JHire</p>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <span className="text-sm font-medium">Welcome, {user.first_name}!</span>

              {/* Dynamic Links Based on User Type */}
              {user.userType === "hr" ? (
                <>
                  <Link to="/hr-dashboard" className="hover:text-green-300 transition">Dashboard</Link>
                  <Link to="/post-job" className="hover:text-green-300 transition">Post Job</Link>
                </>
              ) : (
                <>
                  <Link to="/seeker-dashboard" className="hover:text-green-300 transition">Dashboard</Link>
                </>
              )}

              {/* Logout Button */}
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
                          <Link to="/candidates" className="hover:text-green-300 transition">Candidates</Link>

                 <Link to="/alljobs" className="hover:text-green-300 transition">Jobs</Link>

              <Link to="/login" className="hover:text-green-300 transition">Login</Link>
              <Link 
                to="/register" 
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
