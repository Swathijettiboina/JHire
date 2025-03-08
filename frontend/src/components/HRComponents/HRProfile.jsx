import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPhone, FaEnvelope, FaBuilding, FaBriefcase, FaLinkedin } from "react-icons/fa";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const HRProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/hr/451b4287-0cfd-461c-b597-aca9e6027e8f`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => console.error("Error fetching HR profile:", error));
  }, []);

  if (!profile) {
    return <p className="text-center text-gray-600">Loading HR profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">

        {/* Profile Info */}
        <div className="flex items-center gap-6 mt-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300">
            <img
              src={profile.hr_photo || "profilelogo.jpg"}
              alt="HR Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{`${profile.first_name} ${profile.last_name}`}</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <FaEnvelope className="text-blue-500" /> {profile.email}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <FaPhone className="text-green-500" /> {profile.phone_number}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Personal Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Details</h3>
            <p className="mt-2"><strong>Gender:</strong> {profile.gender}</p>
            <p className="mt-2"><strong>Age:</strong> {profile.age} years</p>
            <p className="mt-2"><strong>About Me:</strong> {profile.about_me}</p>
            {profile.hr_linkedin_profile && (
              <p className="mt-2 flex items-center gap-2">
                <FaLinkedin className="text-blue-500" />
                <a href={profile.hr_linkedin_profile} target="_blank" className="text-blue-500 hover:underline">
                  LinkedIn Profile
                </a>
              </p>
            )}
          </div>

          {/* Professional Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Professional Details</h3>
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
