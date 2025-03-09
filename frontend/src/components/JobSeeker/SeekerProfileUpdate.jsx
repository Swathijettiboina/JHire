import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../../SupabaseClient";
import { useUser } from "../../context/UserContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/jhire";

const SeekerProfileUpdate = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    age: "",
    gender: "",
    about_me: "",
    education: "",
    experience: "",
    skills: "", 
    linkedin_profile: "",
    profile_url: "", //  Use 'profile_url' 
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    axios.get(`${API_BASE_URL}/seeker/${user.id}`)
      .then((response) => {
        setFormData({
          ...response.data,
          skills: Array.isArray(response.data.skills) ? response.data.skills.join(", ") : response.data.skills || "",
          email: response.data.email || "",
        });
        setImagePreview(response.data.profile_url || ""); // Use 'profile_url' 
      })
      .catch((error) => console.error("Error fetching seeker profile:", error));
  }, [user?.id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value ?? "",
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    const timestamp = Date.now();
    const fileExt = file.name.split(".").pop();
    const fileName = `profile_${timestamp}.${fileExt}`;
    const filePath = `seeker_profiles/${user.email}/${fileName}`;

    const { error } = await supabase.storage
      .from("demoforuploadphotosandresumes")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
      return;
    }

    const { data } = supabase.storage
      .from("demoforuploadphotosandresumes")
      .getPublicUrl(filePath);

    if (data && data.publicUrl) {
      const publicUrl = data.publicUrl;
      console.log(publicUrl);
      try {
        await axios.put(`${API_BASE_URL}/seeker/update-profile/${user.id}`, {
          profile_url: publicUrl, // Update backend field correctly
        });
        setFormData((prev) => ({ ...prev, profile_url: publicUrl }));
        setImagePreview(publicUrl);
      } catch (err) {
        console.error("Error updating profile in database:", err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const formattedSkills = Array.isArray(formData.skills)
      ? formData.skills
      : formData.skills.split(",").map((skill) => skill.trim());

    try {
      await axios.put(
        `${API_BASE_URL}/seeker/update-profile/${user.id}`,
        { ...formData, skills: formattedSkills },
        { headers: { "Content-Type": "application/json" } }
      );
      navigate("/seeker-profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 flex gap-8">
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Hello, {`${formData.first_name} ${formData.last_name}`.trim() || "Seeker"}!
        </h1>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
          <img
            src={imagePreview || "https://placehold.co/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <label className="mt-4 text-gray-700 font-medium">Upload Photo</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2" />
        <p className="text-gray-600 mt-2">{formData.email}</p>
      </div>

      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {["phone_number", "age", "gender", "education", "experience", "skills", "linkedin_profile"].map((name) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium">{name.replace("_", " ").toUpperCase()}</label>
              <input
                type="text"
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          ))}

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium">About Me</label>
            <textarea
              name="about_me"
              value={formData.about_me || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg h-24 resize-none"
            />
          </div>

          <div className="col-span-2 flex justify-center">
            <button type="submit" className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SeekerProfileUpdate;
