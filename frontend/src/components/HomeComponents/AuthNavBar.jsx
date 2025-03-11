import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import api from "../../api/axiosInstance";
import Modal from "react-modal";

const AuthNavbar = () => {
  const { user, setUser, setIsAuthenticated } = useUser();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ type: "", text: "" });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setIsAuthenticated(false);
      setModalMessage({
        type: "success",
        text: "You have been logged out successfully!",
      });
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      setModalMessage({
        type: "error",
        text: "Logout failed. Please try again!",
      });
      setModalOpen(true);
    }
  };

  return (
    <>
      <nav className="bg-green-700 p-4 text-white shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl flex items-center font-bold tracking-wide hover:text-green-300 transition"
            style={{ fontFamily: "var(--eb_garamond-font)" }}
          >
            <img
              src="logo.avif"
              alt="Logo"
              className="w-10 h-10 rounded-full mr-2"
            />
            <p>JHire</p>
          </Link>

          {/* Navbar Links (Centered) */}
          <div
            className="hidden md:flex space-x-6 mx-auto"
            style={{ fontFamily: "var(--eb_garamond-font)" }}
          >
            <Link to="/" className="hover:text-green-300 transition">
              Home
            </Link>
            <Link to="/candidates" className="hover:text-green-300 transition">
              Candidates
            </Link>
            <Link to="/alljobs" className="hover:text-green-300 transition">
              Jobs
            </Link>
            <Link to="/companies" className="hover:text-green-300 transition">
              Companies
            </Link>
            <Link to="/post-job" className="hover:text-green-300 transition">
              Post Job
            </Link>
          </div>

          {/* Right-Side Authentication Links */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm font-medium">
                  Welcome, {user.first_name}!
                </span>
                {user.userType === "hr" ? (
                  <Link to="/hr-dashboard">
                    <img
                      src={
                        user.photo_url ||
                        `https://ui-avatars.com/api/?name=${user.first_name}`
                      }
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to="/seeker-dashboard">
                    <img
                      src={
                        user.photo_url ||
                        `https://ui-avatars.com/api/?name=${user.first_name}`
                      }
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-black font-medium hover:text-gray-700 transition"
                  style={{ fontFamily: "var(--gorditas-font)" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-lg font-bold"
                  style={{ fontFamily: "var(--gorditas-font)" }}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
            <Link to="/" className="hover:text-green-300 transition">
              Home
            </Link>
            <Link to="/candidates" className="hover:text-green-300 transition">
              Candidates
            </Link>
            <Link to="/alljobs" className="hover:text-green-300 transition">
              Jobs
            </Link>
            <Link to="/post-job" className="hover:text-green-300 transition">
              Post Job
            </Link>
            <Link to="/login" className="hover:text-green-300 transition">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition"
            >
              Register
            </Link>
          </div>
        )}
      </nav>

      {/* Logout Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white w-[350px] p-6 rounded-lg shadow-xl fixed top-10 left-1/2 transform -translate-x-1/2 text-center border border-gray-300"
        overlayClassName="fixed inset-0 bg-transparent"
      >
        <div className="flex flex-col items-center">
          <div
            className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
              modalMessage.type === "success"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {modalMessage.type === "success" ? "✔" : "❌"}
          </div>
          <h2 className="text-lg font-semibold mb-2">
            {modalMessage.type === "success" ? "Success" : "Logout Failed!"}
          </h2>
          <p className="text-gray-600">{modalMessage.text}</p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setModalOpen(false)}
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AuthNavbar;
