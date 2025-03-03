import React, { useState } from "react";

const jobTypes = ["Remote", "On-site", "Hybrid"];
const employmentTypes = ["Full-time", "Part-time", "Contract"];
const skillsList = ["Java", "React", "Node.js", "Spring Boot", "Python"];

const JobFilter = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    jobType: [],
    employmentType: [],
    location: "",
    salaryRange: "",
    skills: [],
  });

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter((item) => item !== value);
      } else {
        updatedFilters[category] = [...updatedFilters[category], value];
      }
      return updatedFilters;
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="h-screen w-full md:w-1/4 bg-gray-100 p-6 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4">Filter Jobs</h2>

      {/* Job Type */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Job Type</h3>
        {jobTypes.map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.jobType.includes(type)}
              onChange={() => handleCheckboxChange("jobType", type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      {/* Employment Type */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Employment Type</h3>
        {employmentTypes.map((type) => (
          <label key={type} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.employmentType.includes(type)}
              onChange={() => handleCheckboxChange("employmentType", type)}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      {/* Location */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Location</h3>
        <input
          type="text"
          name="location"
          placeholder="Enter city"
          className="border p-2 w-full rounded"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      {/* Salary Range */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Salary Range</h3>
        <input
          type="text"
          name="salaryRange"
          placeholder="E.g., 10-15 LPA"
          className="border p-2 w-full rounded"
          onChange={(e) => setFilters({ ...filters, salaryRange: e.target.value })}
        />
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Skills</h3>
        {skillsList.map((skill) => (
          <label key={skill} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.skills.includes(skill)}
              onChange={() => handleCheckboxChange("skills", skill)}
            />
            <span>{skill}</span>
          </label>
        ))}
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default JobFilter;
