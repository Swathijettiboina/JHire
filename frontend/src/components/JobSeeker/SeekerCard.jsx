import React from "react";

const SeekerCard = ({ seeker }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:shadow-xl transition flex items-center gap-5">
      {/* Profile Image */}
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xl font-semibold">
        {seeker.first_name.charAt(0)}
      </div>
      
      {/* Details Section */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{seeker.first_name} {seeker.last_name}</h3>
        <p className="text-sm text-gray-600">{seeker.specialization || "N/A"}</p>
        
        {/* Skills */}
        <div className="mt-2 flex gap-2 flex-wrap">
          {seeker.skills && seeker.skills.length > 0 ? (
            seeker.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 text-xs px-2 py-1 rounded-full">
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs">No skills listed</span>
          )}
        </div>
      </div>
      
      {/* Profile Link */}
      <div>
        <a
          href={seeker.seeker_linkedin_profile || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default SeekerCard;
