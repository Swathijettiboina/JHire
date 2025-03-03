import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

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
  const [suggestions, setSuggestions] = useState({});
  const navigate = useNavigate();

  const emailDomains = ["gmail.com", "yahoo.com", "outlook.com"];

  // Validate while typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let newErrors = { ...errors };
    let newSuggestions = { ...suggestions };

    switch (name) {
      case "firstName":
      case "lastName":
        newErrors[name] = value.trim() ? "" : `${name.replace("Name", " name")} is required`;
        break;

      case "email":
        if (!value.match(/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/)) {
          newErrors.email = "Must be Gmail, Yahoo, or Outlook";
          const domainSuggestion = emailDomains.find((d) => value.includes("@") && !value.endsWith(d));
          if (domainSuggestion) {
            newSuggestions.email = `Did you mean ${value.split("@")[0]}@${domainSuggestion}?`;
          } else {
            newSuggestions.email = "";
          }
        } else {
          newErrors.email = "";
          newSuggestions.email = "";
        }
        break;

      case "phoneNumber":
        newErrors.phoneNumber = /^\d{10}$/.test(value) ? "" : "Must be 10 digits";
        break;

      case "password":
        if (value.length < 6) {
          newErrors.password = "At least 6 characters";
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = "Include at least 1 uppercase letter";
        } else if (!/[0-9]/.test(value)) {
          newErrors.password = "Include at least 1 number";
        } else {
          newErrors.password = "";
        }
        break;

      case "confirmPassword":
        newErrors.confirmPassword = value === formData.password ? "" : "Passwords do not match";
        break;

      default:
        break;
    }

    setErrors(newErrors);
    setSuggestions(newSuggestions);
  };

  // Validate full form
  const validate = () => {
    let valid = true;
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (errors[field]) valid = false;
    });
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.post("/seeker/register", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        password: formData.password,
      });

      navigate("/login");
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Registration failed" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Job Seeker Registration</h2>
        {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            {suggestions.email && <p className="text-blue-500 text-xs">{suggestions.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerRegistration;
