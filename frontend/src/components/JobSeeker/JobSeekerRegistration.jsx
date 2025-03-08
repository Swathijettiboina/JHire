import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";

const JobSeekerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/seeker/register", formData);
      navigate("/login");
    } catch (err) {
      setErrors({ general: "Registration failed. Try again." });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-200 px-4">
      <div className="bg-green-50 p-6 rounded-lg shadow-lg w-full max-w-4xl flex">
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-700 to-green-500 text-white p-10 flex-col justify-center items-center rounded-l-lg">
          <img src="logo.avif" alt="Logo" className="w-32 h-32 mb-4 rounded-full shadow-lg" />
          <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
          <p className="text-center mt-4 px-4">Join our job-seeking platform and find the perfect career opportunities.</p>
          <button onClick={() => navigate("/hr-register")} className="mt-4 w-full bg-white text-green-700 font-semibold py-2 rounded-lg hover:bg-green-100">Register as Recruiter</button>
        </div>
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Job Seeker Registration</h2>
          {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaUser className="text-gray-500" />
              <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full pl-2 outline-none" />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaUser className="text-gray-500" />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full pl-2 outline-none" />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-500" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full pl-2 outline-none" />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaPhone className="text-gray-500" />
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} className="w-full pl-2 outline-none" />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2 relative">
              <FaLock className="text-gray-500" />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full pl-2 outline-none" />
              <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute right-3">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2 relative">
              <FaCheckCircle className="text-gray-500" />
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-2 outline-none" />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer absolute right-3">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Register</button>
            <p className="text-center mt-4 text-gray-600">
              Already have an account? <Link to='/login' className="text-green-600 font-semibold hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerRegistration;
