import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/jhire";

const HRSignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "",
    department: "",
    years_of_experience: "",
  });

  const [companyExists, setCompanyExists] = useState(true);
  const [companyData, setCompanyData] = useState({
    company_name: "",
    company_website: "",
    company_location_city: "",
    company_location_country: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  // Check if company exists based on email domain
  const checkCompany = async () => {
    if (!formData.email.includes("@")) return; // Ensure valid email format
    const emailDomain = formData.email.split("@")[1];

    try {
      const res = await axios.get(`${API_BASE_URL}/hr/company/check/${emailDomain}`);
      setCompanyExists(res.data.exists);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error checking company existence.");
    }
  };

  // Register HR
  const handleHRSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await axios.post(`${API_BASE_URL}/hr/register/hr`, formData);
      alert("HR Registered Successfully");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error registering HR.");
    }
  };

  // Register Company
  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await axios.post(`${API_BASE_URL}/hr/register/company`, {
        ...companyData,
        hr_email: formData.email,
      });

      setCompanyExists(true);
      alert("Company Registered Successfully. You can now register as HR.");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error registering company.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">HR Registration</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleHRSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required className="input-field" />
            <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required className="input-field" />
          </div>
          <input type="email" name="email" placeholder="Email" onBlur={checkCompany} onChange={handleChange} required className="input-field" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input-field" />
          <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required className="input-field" />
          <input type="text" name="role" placeholder="Role" onChange={handleChange} required className="input-field" />
          <input type="text" name="department" placeholder="Department" onChange={handleChange} required className="input-field" />
          <input type="number" name="years_of_experience" placeholder="Years of Experience" onChange={handleChange} required className="input-field" />

          {companyExists ? (
            <button type="submit" className="btn-primary w-full">Register HR</button>
          ) : (
            <p className="text-red-500 text-center">Company not found. Please register the company first.</p>
          )}
        </form>

        {!companyExists && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Register Company</h2>
            <form onSubmit={handleCompanySubmit} className="space-y-4">
              <input type="text" name="company_name" placeholder="Company Name" onChange={handleCompanyChange} required className="input-field" />
              <input type="text" name="company_website" placeholder="Company Website" onChange={handleCompanyChange} required className="input-field" />
              <input type="text" name="company_location_city" placeholder="City" onChange={handleCompanyChange} required className="input-field" />
              <input type="text" name="company_location_country" placeholder="Country" onChange={handleCompanyChange} required className="input-field" />
              <button type="submit" className="btn-primary w-full">Register Company</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRSignUp;
