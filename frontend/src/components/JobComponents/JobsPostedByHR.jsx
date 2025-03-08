import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const JobsPostedByHR = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user.userType === "hr") {
      const fetchJobs = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/hr/posted-jobs/${user.id}`
          );
          setJobs(response.data?.jobs || []);
        } catch (err) {
          setError("Failed to load job listings. Please try again.");
          console.error("Error fetching jobs:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchJobs();
    }
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading jobs...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Jobs Posted
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          No jobs available at the moment.
        </p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.job_id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {job.job_title}
              </h2>
              <p className="text-gray-600">Role: {job.role}</p>
              <p className="text-gray-600">
                Total Applicants: {job.total_applied}
              </p>
              <p className="text-gray-600">Job Views: {job.job_view_count}</p>
              <p className="text-gray-600">
                Date Posted: {new Date(job.date_posted).toLocaleDateString()}
              </p>

              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => navigate(`/hr/job-details/${job.job_id}`)}
              >
                View Full Job
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPostedByHR;
