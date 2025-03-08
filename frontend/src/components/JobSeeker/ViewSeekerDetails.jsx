import { useLocation, useNavigate } from "react-router-dom";

const ViewSeekerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const seeker = location.state?.seeker;

  if (!seeker) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">No seeker details found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
          {seeker.first_name[0].toUpperCase()}
          {/* <img src={seeker.profile_url} alt="profile" /> */}
        </div>
        <div>
          <h2 className="text-3xl font-semibold">{seeker.first_name} {seeker.last_name}</h2>
          <p className="text-gray-500">{seeker.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div><strong>Phone:</strong> {seeker.phone_number || "N/A"}</div>
        <div><strong>Age:</strong> {seeker.age || "N/A"}</div>
        <div><strong>Gender:</strong> {seeker.gender || "N/A"}</div>
        <div><strong>City:</strong> {seeker.city_name || "N/A"}, {seeker.country_name || "N/A"}</div>
        <div><strong>University:</strong> {seeker.university_name || "N/A"}</div>
        <div><strong>College:</strong> {seeker.college_name || "N/A"}</div>
        <div><strong>Specialization:</strong> {seeker.specialization || "N/A"}</div>
        <div><strong>Degree:</strong> {seeker.degree_name || "N/A"}</div>
        <div><strong>Passing Year:</strong> {seeker.passing_year || "N/A"}</div>
        <div><strong>Experience:</strong> {seeker.years_of_experience ? `${seeker.years_of_experience} years` : "N/A"}</div>
        <div><strong>Previous Company:</strong> {seeker.previous_company || "N/A"}</div>
        <div><strong>Previous Role:</strong> {seeker.previous_job_role || "N/A"}</div>
        <div><strong>Skills:</strong> {seeker.skills?.join(", ") || "N/A"}</div>
        <div>
          <strong>LinkedIn:</strong> {seeker.seeker_linkedin_profile ? (
            <a href={seeker.seeker_linkedin_profile} target="_blank" className="text-blue-600 hover:underline">Profile</a>
          ) : "N/A"}
        </div>
        <div>
          <strong>Resume:</strong> {seeker.resume ? (
            <a href={seeker.resume} target="_blank" className="text-blue-600 hover:underline">Download</a>
          ) : "N/A"}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewSeekerDetails;
