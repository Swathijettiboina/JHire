const supabase = require('../config/connectDb');
const bcrypt = require('bcrypt');

// Get all job seekers
const getAllSeekers = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('seeker_table')
            .select('*');
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({seekers:data});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a job seeker by ID
const getSeekerById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { data, error } = await supabase
            .from('seeker_table')
            .select('*')
            .eq('seeker_id', id);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Register a new job seeker
const registerSeeker = async (req, res) => {
    const { first_name, last_name, email, phone_number, password } = req.body;

    try {
        // Check if email already exists
        const { data: existingUser } = await supabase
            .from('seeker_table')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new seeker
        const { data, error } = await supabase.from('seeker_table').insert([
            {
                first_name,
                last_name,
                email,
                phone_number,
                password_hash: hashedPassword,
            },
        ]);

        if (error) throw error;

        return res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        console.error('Registration Error:', err.message);
        return res.status(500).json({ message: 'Server error' });
    }
};
const getSavedJobs = async (req, res) => {
    try {
        console.log("📢 Fetching saved jobs for seeker:", req.params.id);

        const seeker_id = req.params.id.trim(); // 🔥 Trim extra spaces or newlines

        if (!seeker_id) {
            return res.status(400).json({ error: "Seeker ID is required" });
        }

        // Fetch saved job IDs along with applied_date
        const { data: savedJobs, error: savedJobsError } = await supabase
            .from("applied_jobs")
            .select("job_id, applied_at")
            .eq("seeker_id", seeker_id);

        if (savedJobsError) {
            console.error("Supabase Error (applied_jobs):", savedJobsError.message);
            return res.status(500).json({ error: savedJobsError.message });
        }

        console.log("Saved Jobs Data:", savedJobs);
        const jobIds = savedJobs.map((job) => job.job_id);

        if (jobIds.length === 0) {
            return res.status(200).json({ savedJobs: [] });
        }

        // Fetch job details
        const { data: jobDetails, error: jobDetailsError } = await supabase
            .from("jobs_table")
            .select(`
                job_id,
                job_title,
                job_location,
                job_type,
                company_table ( company_name ),
                date_posted,
                job_status
            `)
            .in("job_id", jobIds);

        if (jobDetailsError) {
            console.error("Supabase Error (jobs_table):", jobDetailsError.message);
            return res.status(500).json({ error: jobDetailsError.message });
        }

        console.log("Job Details:", jobDetails);

        // Merge applied_date into jobDetails
        const mergedJobs = jobDetails.map((job) => {
            const appliedJob = savedJobs.find((applied) => applied.job_id === job.job_id);
            return { ...job, applied_at: appliedJob ? appliedJob.applied_at : null };
        });
        console.log(mergedJobs)

        return res.status(200).json({ savedJobs: mergedJobs });

    } catch (err) {
        console.error("Internal Server Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getWishlist = async (req, res) => {
    try {
        console.log("📢 Fetching wishlist for seeker:", req.params.id);
        const seeker_id = req.params.id.trim();

        if (!seeker_id) {
            return res.status(400).json({ error: "Seeker ID is required" });
        }

        // Fetch saved jobs with job details
        const { data: wishlist, error: wishlistError } = await supabase
            .from("saved_jobs")
            .select(`
                job_id,
                jobs_table (
                    job_title,
                    job_location,
                    job_type,
                    company:company_table ( company_name )
                )
            `)
            .eq("seeker_id", seeker_id).eq("ispresent", true);

        console.log("Wishlist Data:", wishlist); // ✅ Fixed

        if (wishlistError) {
            console.error("❌ Supabase Error (saved_jobs):", wishlistError.message);
            return res.status(500).json({ error: wishlistError.message });
        }

        if (!wishlist || wishlist.length === 0) {
            return res.status(200).json({ wishlist: [] });
        }

        return res.status(200).json({ wishlist });

    } catch (err) {
        console.error("❌ Internal Server Error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
const delwishlist = async (req, res) => {
    const { userId, jobId } = req.params;

    try {
        // 🔥 Update `ispresent` field to false instead of deleting
        const { data, error } = await supabase
            .from("saved_jobs")
            .update({ ispresent: false })
            .eq("seeker_id", userId)
            .eq("job_id", jobId)
            .select(); // Retrieve updated rows to check if the update happened

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ message: "Failed to remove job from wishlist.", error: error.message });
        }

        // ✅ Check if any rows were updated
        if (data.length === 0) {
            return res.status(404).json({ message: "Job not found or already removed from wishlist." });
        }

        res.status(200).json({ message: "Job removed from wishlist successfully." });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Server error." });
    }
};





module.exports = { getAllSeekers, getSeekerById, registerSeeker,getSavedJobs,getWishlist ,delwishlist};
