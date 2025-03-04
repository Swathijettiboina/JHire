import React from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
    <Navbar/>
    
    <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 bg-white-100 min-h-screen">
      {/* Left Side - Image */}
      <div className="md:w-1/2 flex justify-center">
        <img src="homebg.jpg" />
      </div>

      {/* Right Side - Caption and Search Bar */}
      <div className="md:w-1/2 flex flex-col items-start space-y-6 mt-8 md:mt-0">
        <h1 className="text-4xl font-bold text-gray-800">
        Your Dream Job  <span className="text-blue-600">Dream Job</span> is Just a Click Away
        </h1>
        <p className="text-gray-600 text-lg">
          Explore thousands of job opportunities and take the next step in your career.
        </p>
        
        {/* Search Bar */}
        <div className="w-full flex bg-white shadow-md rounded-full overflow-hidden">
          <input 
            type="text" 
            placeholder="Search jobs, companies..." 
            className="w-full px-4 py-3 outline-none text-gray-700" 
          />
          <button className="bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;