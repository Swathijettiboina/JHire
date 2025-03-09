import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import api from "../../api/axiosInstance";
import Modal from "react-modal";
import { FaHome, FaLongArrowAltUp, FaRegistered, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const AuthNavbar = () => {
  const { user, setUser, setIsAuthenticated } = useUser();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ type: "", text: "" });

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

      // Redirect after a short delay
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
      {/* Navbar */}
      <nav className="bg-green-700 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl flex px-5 gap-5 font-bold tracking-wide hover:text-green-300 transition"
          >
            <img
              src="logo.avif"
              alt="Logo"
              className="w-10 h-10 mb-4 rounded-full"
            />
            <p>JHire</p>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-sm font-medium">
                  Welcome, {user.first_name}!
                </span>
                <Link to="/" className="hover:text-green-300 transition">
                  Home
                </Link>
                <Link
                  to="/candidates"
                  className="hover:text-green-300 transition"
                >
                  Candidates
                </Link>
                <Link to="/alljobs" className="hover:text-green-300 transition">
                  Jobs
                </Link>
                

                {/* Dynamic Links Based on User Type */}
                {user.userType === "hr" ? (
                  <>
                    <Link
                      to="/post-job"
                      className="hover:text-green-300 transition"
                    >
                      Post Job
                    </Link>
                    <Link
                      to="/hr-dashboard"
                      className="hover:text-green-300   transition"
                    >
                      <img
                        src={
                          user.photo_url ||
                          `https://ui-avatars.com/api/?name=${user.first_name}`
                        }
                        alt="Photo"
                        className="h-10 w-10 rounded-full"
                      />
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/seeker-dashboard"
                    className="hover:text-green-300 h-10 w-10 rounded-full  transition"
                  >
                    <img
                      src={
                        user.photo_url ||
                        `https://ui-avatars.com/api/?name=${user.first_name}`
                      }
                      alt="Photo"
                       className="h-10 w-10 rounded-full"
                    />
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium transition"
                >
                  <div className="flex items-center gap-2">
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-green-300 transition">
                  <FaHome/>
                </Link>
                <Link
                  to="/candidates"
                  className="hover:text-green-300 transition"
                >
                  Candidates
                </Link>
                <Link to="/alljobs" className="hover:text-green-300 transition">
                  Jobs
                </Link>
                <Link
                      to="/post-job"
                      className="hover:text-green-300 transition"
                    >
                      Post Job
                    </Link>
                <Link to="/login" className="hover:text-green-300 transition">
                <div className="flex items-center gap-2">
                    <FaSignInAlt />
                    <span>Login</span>
                  </div>                </Link>
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

      {/* Logout Success/Failure Pop-up */}
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
            {modalMessage.type === "success" ? "✔️" : "❌"}
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
