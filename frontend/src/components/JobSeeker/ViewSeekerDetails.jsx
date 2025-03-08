import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const ViewSeekerDetails = () => {
  const { seeker_id } = useParams();
  const [seeker, setSeeker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeekerDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/seeker/${seeker_id}`);
        console.log("Fetched Seeker Data:", response.data); // Debugging
        setSeeker(response.data);
      } catch (error) {
        console.error("Error fetching seeker details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeekerDetails();
  }, [seeker_id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!seeker) return <div className="text-center py-10 text-red-600">Seeker not found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{seeker.first_name} {seeker.last_name}</h1>
          <p className="text-gray-500">{seeker.about_me}</p>
        </div>

        {/* Personal Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <p><strong>Email:</strong> {seeker.email}</p>
            <p><strong>Phone:</strong> {seeker.phone_number}</p>
            <p><strong>Gender:</strong> {seeker.gender}</p>
            <p><strong>Age:</strong> {seeker.age}</p>
            <p><strong>Location:</strong> {seeker.city_name}, {seeker.country_name} - {seeker.pin_code}</p>
            <p>
              <strong>LinkedIn:</strong> 
              <a href={seeker.seeker_linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline"> View Profile</a>
            </p>
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Education</h2>
          <div className="mt-4">
            <p><strong>University:</strong> {seeker.university_name}</p>
            <p><strong>College:</strong> {seeker.college_name}</p>
            <p><strong>Degree:</strong> {seeker.degree_name} in {seeker.specialization}</p>
            <p><strong>Passing Year:</strong> {seeker.passing_year}</p>
            <p><strong>Grade:</strong> {seeker.grade_obtained}</p>
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Work Experience</h2>
          <div className="mt-4">
            <p><strong>Company:</strong> {seeker.previous_company}</p>
            <p><strong>Job Role:</strong> {seeker.previous_job_role}</p>
            <p><strong>Years of Experience:</strong> {seeker.years_of_experience} years</p>
          </div>
        </div>

        {/* Skills & Certifications */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Skills & Certifications</h2>
          <div className="mt-4">
            <p><strong>Skills:</strong> {seeker.skills?.join(", ")}</p>
            <p><strong>Certifications:</strong> {seeker.certification_list?.join(", ")}</p>
          </div>
        </div>

        {/* Resume */}
        {seeker.resume && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Resume</h2>
            <div className="mt-4">
              <a href={seeker.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                View Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSeekerDetails;
