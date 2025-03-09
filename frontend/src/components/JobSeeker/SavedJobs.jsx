import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const SavedJobs = () => {
  const { user } = useUser(); 
  const [savedJobs, setSavedJobs] = useState([]);
  const [error, setError] = useState(null);

  console.log("User from context:", user);

  useEffect(() => {
    if (!user?.id) {
      console.warn("No user found, skipping API call");
      return;
    }

    console.log("Fetching saved jobs for user:", user.id);
    console.log("API URL:", `${API_BASE_URL}/seeker/applied/${user.id}`);

    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/seeker/applied/${user.id}`);
        console.log("Saved Jobs Response:", response.data);

        if (response.data?.savedJobs) {
          setSavedJobs(Array.isArray(response.data.savedJobs) ? response.data.savedJobs : []);
        } else {
          setSavedJobs([]);
        }
      } catch (err) {
        console.error("Error fetching saved jobs:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch saved jobs.");
      }
    };

    fetchSavedJobs();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Saved Jobs</h2>

      {error && <p className="text-red-500">{error}</p>}

      {savedJobs.length === 0 && !error ? (
        <p className="text-gray-600">No saved jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map(({ job_id, job_title, job_location, job_type, company_table }) => (
            <div key={job_id} className="p-4 border rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold">{job_title}</h3>
              <p className="text-gray-600">{company_table?.company_name || "Unknown Company"}</p>
              <p className="text-gray-500">{job_location}</p>
              <p className="text-gray-400">{job_type}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          console.log("Manually fetching saved jobs...");
          if (user?.id) {
            axios.get(`${API_BASE_URL}/seeker/applied/${user.id}`)
              .then((response) => {
                console.log("Manual API Response:", response.data);
                setSavedJobs(Array.isArray(response.data.savedJobs) ? response.data.savedJobs : []);
              })
              .catch((err) => {
                console.error(" Manual fetch error:", err.response?.data || err.message);
                setError("Failed to fetch saved jobs.");
              });
          } else {
            console.warn(" User ID missing, cannot fetch saved jobs.");
          }
        }}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Reload Saved Jobs
      </button>
    </div>
  );
};

export default SavedJobs;
