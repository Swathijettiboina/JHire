import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, Briefcase, Globe, Building } from "lucide-react";
import BackButton from "../BackButton";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const ViewJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <div className="container mx-auto p-6 max-w-3xl bg-white shadow-md rounded-lg">
      {/* Job Title */}
      <BackButton />
      <h1 className="text-3xl font-bold mb-4">{job.job_title}</h1>
      <p className="text-gray-600 text-lg mb-4">{job.job_description}</p>

      {/* Job Details */}
      <div className="space-y-2 text-lg border-b pb-4">
        <p><strong>Role:</strong> {job.role}</p>
        <p><strong>Job Type:</strong> {job.job_type}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Employment Type:</strong> {job.employment_type}</p>
        <p><strong>Vacancies</strong> {job.number_of_vacancies}</p>
        <p><strong>Total Applied:</strong> {job.total_applied}</p>
        <p><strong>Skills Required:</strong> {job.skills?.join(", ")}</p>
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
    </div>
  );
};

export default ViewJob;