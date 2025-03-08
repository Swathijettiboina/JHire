const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const supabase = require("../config/connectDb");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const loginUser = async (req, res) => {
  console.log("Login request received:", req.body);

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

      if (error || !data) return res.status(401).json({ message: "Invalid email or password" });
      user = data;
    } else {
      userType = "hr";
      const { data, error } = await supabase
        .from("hr_table")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) return res.status(401).json({ message: "Invalid email or password" });
      user = data;
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
      first_name: user.first_name, // Add first name for frontend display
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    // Store token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ Only secure in production
      sameSite: "Lax",
    });

    return res.json({ user: payload });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
const checkSession = (req, res) => {
  try {
    console.log("Cookies Received:", req.cookies); // ✅ Debugging log

    const token = req.cookies?.token; // ✅ Ensure cookies exist

    if (!token) {
      return res.status(401).json({ message: "No session found" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid session" });
      }

      res.json({ user: decoded });
    });
  } catch (error) {
    console.error("Check session error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// LOGOUT USER
const logoutUser = (req, res) => {
  res.clearCookie("token"); // Clear authentication cookie
  return res.json({ message: "Logged out successfully" });
};

module.exports = { loginUser, checkSession, logoutUser };
