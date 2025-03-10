import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApplyJobForm from "./ApplyJobForm";
import axios from "axios";
import { MapPin, Briefcase, Globe, Building } from "lucide-react";
import BackButton from "../BackButton";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const ViewJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
        if (response.data?.job) {
          setJob(response.data.job);
        } else {
          setError("Job not found");
        }
      } catch (err) {
        setError("Error fetching job: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading job details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );

  const company = job.company_table || {};

  return (
    <div className="flex flex-col items-left bg-green-50 min-h-screen p-8">
       <BackButton />
    <div className="flex flex-col items-center bg-green-50 min-h-screen p-8">
      <h2 className="text-green-700 text-3xl font-bold mb-6">Job Details</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl border border-green-500">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-700 font-semibold">Job Title:</p>
            <p className="text-gray-900">{job.job_title}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Role:</p>
            <p className="text-gray-900">{job.role}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Job Description:</p>
          <p className="text-gray-900">{job.job_description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-700 font-semibold">Job Type:</p>
            <p className="text-gray-900">{job.job_type}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Employment Type:</p>
            <p className="text-gray-900">{job.employment_type}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-700 font-semibold">Salary:</p>
            <p className="text-gray-900">{job.salary}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Vacancies:</p>
            <p className="text-gray-900">{job.number_of_vacancies}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-700 font-semibold">Total Applied:</p>
            <p className="text-gray-900">{job.total_applied}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Skills Required:</p>
            <p className="text-gray-900">{job.skills?.join(", ")}</p>
          </div>
        </div>

        {/* Company Details */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">About the Company</h2>
          <p className="text-lg font-semibold">{company.company_name}</p>
          <p className="text-gray-600">{company.company_type}</p>
          <div className="flex items-center mt-2 text-gray-700">
            <Building size={16} className="mr-2" />
            <span>{company.company_location_city}, {company.company_location_country}</span>
          </div>
          <div className="flex items-center mt-2 text-gray-700">
            <MapPin size={16} className="mr-2" />
            <span>Pin Code: {company.office_pin_code}</span>
          </div>
          <div className="flex items-center mt-2 text-gray-700">
            <Globe size={16} className="mr-2" />
            <a href={company.company_website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Company Website</a>
          </div>
          <div className="flex items-center mt-2 text-gray-700">
            <Briefcase size={16} className="mr-2" />
            <a href={company.company_linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn Profile</a>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
          >
            Apply Job
          </button>
        </div>

        </div>
      </div>
      {isModalOpen && <ApplyJobForm onClose={() => setIsModalOpen(false)} jobId={id} />}
    </div>
  );
};

export default ViewJob;