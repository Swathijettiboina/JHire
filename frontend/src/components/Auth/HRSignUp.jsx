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
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const checkCompany = async () => {
    if (!formData.email.includes("@")) return;
    const emailDomain = formData.email.split("@")[1];

    try {
      const res = await axios.get(`${API_BASE_URL}/hr/company/check/${emailDomain}`);
      setCompanyExists(res.data.exists);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error checking company existence.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      if (!companyExists) {
        await axios.post(`${API_BASE_URL}/hr/register/company`, {
          ...companyData,
          hr_email: formData.email,
        });
      }
  
      await axios.post(`${API_BASE_URL}/hr/register/hr`, formData);
      setSuccessMessage(companyExists ? "HR Registered Successfully" : "Company & HR Registered Successfully");
  
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: "",
        role: "",
        department: "",
        years_of_experience: "",
      });
  
      setCompanyData({
        company_name: "",
        company_website: "",
        company_location_city: "",
        company_location_country: "",
      });
  
      setCompanyExists(true); 
  
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error registering.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">HR Registration</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required className="input-field" />
            <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required className="input-field" />
          </div>
          <input type="email" name="email" placeholder="Email" onBlur={checkCompany} onChange={handleChange} required className="input-field" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input-field" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required className="input-field" />
            <input type="text" name="role" placeholder="Role" onChange={handleChange} required className="input-field" />
          </div>
          <input type="text" name="department" placeholder="Department" onChange={handleChange} required className="input-field" />
          <input type="number" name="years_of_experience" placeholder="Years of Experience" onChange={handleChange} required className="input-field" />

          {!companyExists && (
            <div className="bg-blue-50 p-4 rounded-md shadow-sm">
              <h2 className="text-lg font-medium text-blue-700 mb-2 text-center">Company Not Found! Register Below</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="company_name" placeholder="Company Name" onChange={handleCompanyChange} required className="input-field" />
                <input type="text" name="company_website" placeholder="Company Website" onChange={handleCompanyChange} required className="input-field" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="company_location_city" placeholder="City" onChange={handleCompanyChange} required className="input-field" />
                <input type="text" name="company_location_country" placeholder="Country" onChange={handleCompanyChange} required className="input-field" />
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md text-lg hover:bg-blue-700 transition">
            {companyExists ? "Register HR" : "Register Company & HR"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HRSignUp;
