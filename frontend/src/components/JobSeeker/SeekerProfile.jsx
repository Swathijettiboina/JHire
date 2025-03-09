import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import { FaPhone, FaEnvelope, FaBriefcase, FaLinkedin } from "react-icons/fa";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const SeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    axios
      .get(`${API_BASE_URL}/seeker/${user.id}`)
      .then((response) => {
        const seekerData = response.data?.data?.[0]; // Extract first object from array
        if (seekerData) {
          setProfile(seekerData);
        } else {
          console.error("No Seeker profile found.");
        }
      })
      .catch((error) => console.error("Error fetching Seeker profile:", error));
  }, [user?.id]);

  if (!profile) {
    return <p className="text-center text-blue-600">Loading Seeker profile...</p>;
  }

  return (
    <div className="min-h-screen bg-blue-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg border border-blue-300">
        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
            <img
              src={profile.profile_url || "profilelogo.jpg"}
              alt="Seeker Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-blue-700">
              {`${profile.first_name} ${profile.last_name}`}
            </h2>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
              <FaEnvelope className="text-blue-500" /> {profile.email}
            </p>
            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
              <FaPhone className="text-blue-500" /> {profile.phone_number}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Personal Details */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-300">
            <h3 className="text-lg font-semibold text-blue-700 border-b pb-2">Personal Details</h3>
            <p className="mt-2"><strong>Gender:</strong> {profile.gender}</p>
            <p className="mt-2"><strong>Age:</strong> {profile.age} years</p>
            <p className="mt-2"><strong>About Me:</strong> {profile.about_me}</p>
            {profile.seeker_linkedin_profile && (
              <p className="mt-2 flex items-center gap-2">
                <FaLinkedin className="text-blue-500" />
                <a href={profile.seeker_linkedin_profile} target="_blank" className="text-blue-500 hover:underline">
                  LinkedIn Profile
                </a>
              </p>
            )}
          </div>

          {/* Professional Details */}
          <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-300">
            <h3 className="text-lg font-semibold text-blue-700 border-b pb-2">Professional Details</h3>
            <p className="mt-2 flex items-center gap-2">
              <FaBriefcase className="text-gray-500" /> <strong>Current Job Role:</strong> {profile.current_role || "N/A"}
            </p>
            <p className="mt-2"><strong>Education:</strong> {profile.degree_name} in {profile.specialization}</p>
            <p className="mt-2"><strong>University:</strong> {profile.university_name}</p>
            <p className="mt-2"><strong>Years of Experience:</strong> {profile.years_of_experience} years</p>
            <p className="mt-2"><strong>Skills:</strong> {profile.skills?.join(", ")}</p>
            <p className="mt-2"><strong>Looking for:</strong> {profile.desired_role || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerProfile;
