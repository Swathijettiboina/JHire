import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const HRNavbar = () => {
  const [isEmployerMenuOpen, setIsEmployerMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-md bg-white">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-lg font-bold">J</span>
        </div>
        <span className="text-blue-600 text-xl font-bold">JHire</span>
      </div>
      
      {/* Navigation Links */}

      <div className="hidden md:flex space-x-6 text-gray-700">
        <Link to="/alljobs" className="hover:text-blue-600">Jobs</Link>
        {/* <a href="#" className="hover:text-blue-600">Jobs</a> */}
        <Link to="/companies" className="hover:text-blue-600">Companies</Link>
        <Link to="/about" className="hover:text-blue-600">Services</Link>
      </div>
      
      {/* Auth Buttons and Employer Menu */}
      <div className="flex items-center space-x-4">
      <Link to="/alljobs"  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50">All Jobs</Link>
      <Link to="/hr-profile" className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">Profile</Link>
        
        {/* Employer Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsEmployerMenuOpen(!isEmployerMenuOpen)}
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
            <span>For employers</span>
            <ChevronDown size={16} />
          </button>
          {isEmployerMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md py-2">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Post a Job</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Employer Login</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HRNavbar;