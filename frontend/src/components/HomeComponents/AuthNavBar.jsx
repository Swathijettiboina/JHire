import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import api from "../../api/axiosInstance";

const AuthNavbar = () => {
  const { user, setUser } = useUser(); 

  const handleLogout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    console.log("Logged out");
    console.log("User:", user);
    setUser(null);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">JHire</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Welcome, {user.first_name}!</span>
            {user.userType === "hr" ? (
              <Link to="/" className="mr-4">Dashboard</Link>
            ) : (
              <Link to="/" className="mr-4">Dashboard</Link>
            )}
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
