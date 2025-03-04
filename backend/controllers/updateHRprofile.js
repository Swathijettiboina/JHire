const supabase = require("../config/connectDb");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // In-memory file storage for image uploads

const updateHrProfile = async (req, res) => {
    const { id } = req.params;
    const {
        first_name,
        last_name,
        email, // Read-only in frontend, but included for consistency
        phone_number,
        age,
        gender,
        about_me,
        university_name,
        degree_name,
        specialization,
        years_of_experience,
        skills,
        hr_linkedin_profile,
        role,
        department
    } = req.body;
    
    let hr_photo_url = null;

    try {
        // Check if HR exists
        const { data: existingHr, error: hrError } = await supabase
            .from("hr_table")
            .select("hr_id, hr_photo")
            .eq("hr_id", id)
            .single();

        if (hrError) throw hrError;
        if (!existingHr) return res.status(404).json({ message: "HR not found" });

        // Handle Image Upload
        if (req.file) {
            const file = req.file;
            const fileName = `hr-profile-photos/hr_${id}_${Date.now()}_${file.originalname}`;

            // Upload file to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("profile-photos")
                .upload(fileName, file.buffer, { contentType: file.mimetype, upsert: true });

            if (uploadError) {
                console.error("Error uploading image:", uploadError);
                throw uploadError;
            }

            // Get Public URL of the Uploaded Image
            const { publicURL, error: urlError } = supabase.storage
                .from("profile-photos")
                .getPublicUrl(fileName);

            if (urlError) {
                console.error("Error getting public URL:", urlError);
                throw urlError;
            }

            hr_photo_url = publicURL;
        } else {
            hr_photo_url = existingHr.hr_photo; // Retain existing photo if no new upload
        }

        // Convert `skills` from string to array (if it's a string)
        const formattedSkills = typeof skills === "string" ? skills.split(",").map(skill => skill.trim()) : skills;
        // gender=gender||"Other";
        // Update HR profile
        const { data: updatedHr, error: updateError } = await supabase
            .from("hr_table")
            .update({
                first_name,
                last_name,
                email, // Read-only field, should ideally not change
                phone_number,
                age,
                gender,
                about_me,
                university_name,
                degree_name,
                specialization,
                years_of_experience,
                skills: formattedSkills, // Ensure correct format for `text[]`
                hr_linkedin_profile,
                role,
                department,
                hr_photo: hr_photo_url // Store the updated photo URL
            })
            .eq("hr_id", id)
            .select("*");

        if (updateError) throw updateError;

        return res.status(200).json({ message: "Profile updated successfully", hr: updatedHr });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

module.exports = { updateHrProfile };
