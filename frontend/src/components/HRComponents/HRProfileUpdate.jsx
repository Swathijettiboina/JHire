import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const HRProfileUpdate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "", // Read-only
    phone_number: "",
    age: "",
    gender: "",
    about_me: "",
    university_name: "",
    degree_name: "",
    specialization: "",
    years_of_experience: "",
    skills: "",
    hr_linkedin_profile: "",
    hr_photo: "",
    role: "",
    department: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/hr/451b4287-0cfd-461c-b597-aca9e6027e8f`)
      .then((response) => {
        setFormData(response.data);
        setImagePreview(response.data.hr_photo);
      })
      .catch((error) => console.error("Error fetching HR profile:", error));
  }, []);

  const handleChange = (e) => {
    if (e.target.name !== "email") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, hr_photo: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "hr_photo") {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (formData.hr_photo instanceof File) {
        formDataToSend.append("hr_photo", formData.hr_photo);
      }

      await axios.put(`${API_BASE_URL}/hr/update-profile/451b4287-0cfd-461c-b597-aca9e6027e8f`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/hr-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-10 flex gap-8">
      {/* Left Section: Profile Image & Basic Info */}
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Hello, {`${formData.first_name} ${formData.last_name}` || "HR"}!
        </h1>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-300">
          <img
            src={imagePreview || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <label className="mt-4 text-gray-700 font-medium">Upload Photo</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
        <p className="text-gray-600 mt-2">{formData.email}</p>

        <div className="mt-4 text-center">
          <label className="block text-gray-700 font-medium">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="text-lg font-semibold text-gray-700 text-center w-full p-1 border rounded-lg"
          />
          <label className="block text-gray-700 font-medium mt-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="text-lg font-semibold text-gray-700 text-center w-full p-1 border rounded-lg"
          />
        </div>
      </div>

      {/* Right Section: Editable Fields */}
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">Professional Information</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {[
            { label: "University Name", name: "university_name" },
            { label: "Degree", name: "degree_name" },
            { label: "Specialization", name: "specialization" },
            { label: "Years of Experience", name: "years_of_experience" },
            { label: "Skills", name: "skills" },
            { label: "LinkedIn Profile", name: "hr_linkedin_profile" },
            { label: "Role", name: "role" },
            { label: "Department", name: "department" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          ))}

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">About Me</label>
            <textarea
              name="about_me"
              value={formData.about_me}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg h-24 resize-none"
            />
          </div>

          <div className="col-span-2 flex justify-center">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HRProfileUpdate;
