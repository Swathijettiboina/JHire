import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const ViewJobAlongWIthApplicants = () => {
  const { job_id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/hr/job-details/${job_id}`);
        console.log("Fetched Job Data:", response.data); // Debugging
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [job_id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!jobData || !jobData.job) return <div className="text-center py-10 text-red-600">Job not found.</div>;

  const { job, applied_candidates } = jobData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Job Details */}
      <h1 className="text-2xl font-bold text-gray-800">{job.job_title}</h1>
      <p className="text-gray-600">{job.job_description}</p>

      <div className="mt-4">
        <p><strong>Role:</strong> {job.role}</p>
        <p><strong>Job Type:</strong> {job.job_type} | {job.employment_type}</p>
        <p><strong>Location:</strong> {job.job_location}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Posted On:</strong> {new Date(job.date_posted).toLocaleDateString()}</p>
        <p><strong>Skills Required:</strong> {job.skills?.join(", ")}</p>
        <p><strong>Vacancies:</strong> {job.number_of_vacancies}</p>
        <p><strong>Total Applied:</strong> {job.total_applied}</p>
      </div>

      {/* Applied Candidates */}
      <h2 className="mt-6 text-xl font-semibold">Applied Candidates</h2>
      {applied_candidates.length === 0 ? (
        <p className="text-gray-600 mt-2">No applications yet.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {applied_candidates.map((applicant) => (
            <div key={applicant.application_id} className="p-4 bg-gray-100 rounded-md">
              <p><strong>Name:</strong> {applicant.seeker_table.first_name} {applicant.seeker_table.last_name}</p>
              <p><strong>Email:</strong> {applicant.seeker_table.email}</p>
              <p><strong>Phone:</strong> {applicant.seeker_table.phone_number}</p>
              <p><strong>Skills:</strong> {applicant.seeker_table.skills?.join(", ")}</p>
              <p><strong>Application Status:</strong> {applicant.application_status}</p>
              <p><strong>Applied On:</strong> {new Date(applicant.applied_at).toLocaleDateString()}</p>
              {applicant.seeker_resume && (
                <a 
                  href={`https://your-storage-url/${applicant.seeker_resume}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  View Resume
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Back Button */}
      <button 
        className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        onClick={() => navigate(-1)}
      >
        Back to Jobs
      </button>
    </div>
  );
};

export default ViewJobAlongWIthApplicants;
