import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext"; // ✅ Import context
import {
  FaUser,
  FaBriefcase,
  FaPlus,
  FaEdit,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import HRProfile from "./HRProfile";
import PostJobForm from "../JobComponents/PostJobForm";
import JobsPostedByHR from "../JobComponents/JobsPostedByHR";
import HRProfileUpdate from "./HRProfileUpdate";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const HRDashboard = () => {
  const { user } = useUser(); // ✅ Get user from context
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userType === "hr") {
      axios
        .get(`${API_BASE_URL}/hr/${user.id}`) // ✅ Use HR ID from context
        .then((response) => setProfile(response.data))
        .catch((error) => console.error("Error fetching HR profile:", error));
    }
  }, [user]); // ✅ Run only when `user` changes

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <HRProfile />;
      case "edit-profile":
        return <HRProfileUpdate />;
      case "jobs":
        return <JobsPostedByHR />;
      case "post-job":
        return <PostJobForm />;
      default:
        return <JobsPostedByHR />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-4 text-blue-600 focus:outline-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-blue-600 text-white shadow-lg p-6 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <img
          src="profilelogo.jpg"
          alt="HR Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white mx-auto"
        />
        <ul className="mt-6 text-center">
          <li
            className="mb-4 flex items-center justify-center gap-3 text-lg font-semibold hover:text-gray-300 cursor-pointer"
            onClick={() => setActiveTab("profile")}
          >
            <FaUser /> My Profile
          </li>
          <li
            className="mb-4 flex items-center justify-center gap-3 text-lg font-semibold hover:text-gray-300 cursor-pointer"
            onClick={() => setActiveTab("edit-profile")}
          >
            <FaEdit /> Update Profile
          </li>
          <li
            className="mb-4 flex items-center justify-center gap-3 text-lg font-semibold hover:text-gray-300 cursor-pointer"
            onClick={() => setActiveTab("jobs")}
          >
            <FaBriefcase /> My Jobs
          </li>
          <li
            className="mb-4 flex items-center justify-center gap-3 text-lg font-semibold hover:text-gray-300 cursor-pointer"
            onClick={() => setActiveTab("post-job")}
          >
            <FaPlus /> Post a Job
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5">{renderContent()}</div>
    </div>
  );
};

export default HRDashboard;
