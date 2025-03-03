const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const supabase = require("../config/connectDb");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;
    let userType;

    // Determine user type based on email domain
    if (email.match(/@(gmail\.com|yahoo\.com|outlook\.com)$/)) {
      userType = "seeker";
      const { data, error } = await supabase
        .from("seeker_table")
        .select("*")
        .eq("email", email)
        .single();
      if (error) throw error;
      user = data;
    } else {
      userType = "hr";
      const { data, error } = await supabase
        .from("hr_table")
        .select("*")
        .eq("email", email)
        .single();
      if (error) throw error;
      user = data;
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const payload = {
      id: user.seeker_id || user.hr_id,
      email: user.email,
      userType: userType,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    // Store token in HTTP-only cookie
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "Strict" });

    return res.json({ userType });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };
