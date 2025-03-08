import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

import axios from "axios";
import { FaPhone, FaEnvelope, FaBuilding, FaBriefcase, FaLinkedin } from "react-icons/fa";
const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const HRProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();


  useEffect(() => {
    if (!user?.id) return;

    axios.get(`${API_BASE_URL}/hr/${user.id}`)
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching HR profile:", error));
  }, []);

  if (!profile) {
    return <p className="text-center text-green-600">Loading HR profile...</p>;
  }

  return (
    <div className="min-h-screen bg-green-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg border border-green-300">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-500">
            <img
              src={profile.hr_photo || "profilelogo.jpg"}
              alt="HR Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-green-700">{`${profile.first_name} ${profile.last_name}`}</h2>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
              <FaEnvelope className="text-green-500" /> {profile.email}
            </p>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
              <FaPhone className="text-green-500" /> {profile.phone_number}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Personal Details */}
          <div className="bg-green-50 p-4 rounded-lg shadow-md border border-green-300">
            <h3 className="text-lg font-semibold text-green-700 border-b pb-2">Personal Details</h3>
            <p className="mt-2"><strong>Gender:</strong> {profile.gender}</p>
            <p className="mt-2"><strong>Age:</strong> {profile.age} years</p>
            <p className="mt-2"><strong>About Me:</strong> {profile.about_me}</p>
            {profile.hr_linkedin_profile && (
              <p className="mt-2 flex items-center gap-2">
                <FaLinkedin className="text-green-500" />
                <a href={profile.hr_linkedin_profile} target="_blank" className="text-green-500 hover:underline">
                  LinkedIn Profile
                </a>
              </p>
            )}
          </div>

          {/* Professional Details */}
          <div className="bg-green-50 p-4 rounded-lg shadow-md border border-green-300">
            <h3 className="text-lg font-semibold text-green-700 border-b pb-2">Professional Details</h3>
            <p className="mt-2 flex items-center gap-2">
              <FaBuilding className="text-gray-500" /> <strong>Company:</strong> {profile.company_name}
            </p>
            <p className="mt-2 flex items-center gap-2">
              <FaBriefcase className="text-gray-500" /> <strong>Role:</strong> {profile.role}
            </p>
            <p className="mt-2"><strong>Department:</strong> {profile.department || "N/A"}</p>
            <p className="mt-2"><strong>Experience:</strong> {profile.years_of_experience} years</p>
            <p className="mt-2"><strong>University:</strong> {profile.university_name}</p>
            <p className="mt-2"><strong>Degree:</strong> {profile.degree_name} in {profile.specialization}</p>
            <p className="mt-2"><strong>Skills:</strong> {profile.skills?.join(", ")}</p>
            <p className="mt-2"><strong>Total Jobs Posted:</strong> {profile.total_jobs_posted}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProfile;