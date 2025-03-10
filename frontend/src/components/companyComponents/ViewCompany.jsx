import React from "react";

const hrListings = [
  { name: "John Doe", role: "HR Manager", skills: ["Recruiting", "Onboarding"] },
  { name: "Jane Smith", role: "Talent Acquisition", skills: ["Hiring", "Networking"] },
];

const jobListings = [
  { title: "Software Engineer", company: "TCS", location: "Chennai", type: "Full-time", skills: ["Java", "Spring Boot"] },
  { title: "Marketing Specialist", company: "Reliance", location: "Hyderabad", type: "Freelance", skills: ["SEO", "Google Ads"] },
];

const companyDetails = {
  name: "Wipro",
  industry: "IT Services",
  location: "Bangalore, India",
  pin: "560002",
  website: "https://wipro.com",
  linkedin: "https://linkedin.com/company/wipro",
};

const ViewCompany= () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 p-6">
      {/* HR Listings */}
      <div className="w-full md:w-1/3 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">HR Listings</h2>
        {hrListings.map((hr, index) => (
          <div key={index} className="p-3 mb-3 border rounded-lg">
            <h3 className="font-semibold">{hr.name}</h3>
            <p className="text-sm text-gray-600">{hr.role}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {hr.skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-gray-200 rounded-md">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Job Listings */}
      <div className="w-full md:w-1/3 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Job Listings</h2>
        {jobListings.map((job, index) => (
          <div key={index} className="p-3 mb-3 border rounded-lg">
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
            <p className="text-sm text-gray-500">{job.type}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 text-xs bg-gray-200 rounded-md">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Company Details */}
      <div className="w-full md:w-1/3 bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">About the Company</h2>
        <p className="text-lg font-semibold">{companyDetails.name}</p>
        <p className="text-sm text-gray-600">{companyDetails.industry}</p>
        <p className="text-sm text-gray-500">{companyDetails.location}</p>
        <p className="text-sm text-gray-500">Pin Code: {companyDetails.pin}</p>
        <div className="mt-3">
          <a href={companyDetails.website} className="text-blue-600 hover:underline">Company Website</a><br />
          <a href={companyDetails.linkedin} className="text-blue-600 hover:underline">LinkedIn Profile</a>
        </div>
      </div>
    </div>
  );
};

export default ViewCompany;