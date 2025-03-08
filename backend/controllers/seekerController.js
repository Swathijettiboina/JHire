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

module.exports = { getAllSeekers, getSeekerById, registerSeeker };
