import React, { useEffect, useState } from "react";
import axios from "axios";
import SeekerCard from "./SeekerCard"; // Import the SeekerCard component

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const SeekerListing = () => {
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const seekersPerPage = 6;

  useEffect(() => {
    const fetchSeekers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/seeker`);
        if (response.data?.seekers && Array.isArray(response.data.seekers)) {
          setSeekers(response.data.seekers);
        } else {
          throw new Error("Unexpected API response format.");
        }
      } catch (err) {
        setError("Failed to load seekers. Please try again.");
        console.error("Error fetching seekers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeekers();
  }, []);

  // Pagination logic
  const indexOfLastSeeker = currentPage * seekersPerPage;
  const indexOfFirstSeeker = indexOfLastSeeker - seekersPerPage;
  const currentSeekers = seekers.slice(indexOfFirstSeeker, indexOfLastSeeker);
  const totalPages = Math.ceil(seekers.length / seekersPerPage);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading seekers...</p>
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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Seeker Listings</h1>

      {currentSeekers.length === 0 ? (
        <p className="text-center text-gray-500">No seekers available at the moment.</p>
      ) : (
        <div className="space-y-6">
          {currentSeekers.map((seeker) => (
            <SeekerCard key={seeker.seeker_id} seeker={seeker} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {seekers.length > seekersPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            className={`px-4 py-2 border rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>

          <span className="text-gray-700">Page {currentPage} of {totalPages}</span>

          <button
            className={`px-4 py-2 border rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SeekerListing;
