import { useState } from "react";

const PostJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    role: "",
    numberOfVacancies: "",
    skills: "",
    jobDescription: "",
    jobType: "Remote",
    employmentType: "Full-time",
    salary: "",
    jobLocation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto w-full md:p-8">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Post a Job</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Job Title *</label>
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Role *</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Job Description *</label>
          <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" rows="4" required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Number of Vacancies *</label>
          <input type="number" name="numberOfVacancies" value={formData.numberOfVacancies} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Skills (comma separated) *</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Job Type *</label>
          <select name="jobType" value={formData.jobType} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Employment Type *</label>
          <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Salary *</label>
          <input type="text" name="salary" value={formData.salary} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Job Location *</label>
          <input type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="col-span-2 flex justify-center">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 w-full sm:w-auto">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;
