const express = require("express");
const cors = require("cors");

const seekerRoutes = require("./routes/seekerRoutes");
const hrRoutes = require("./routes/hrRoutes");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Change to your frontend URL
  credentials: true, // Important for cookies
}));

app.use(express.json({ limit: "50mb" })); // ⬆ Increase JSON body size limit
app.use(express.urlencoded({ limit: "50mb", extended: true })); // ⬆ Increase URL-encoded body size limit

// jhire prefix for all routes
app.use("/jhire/seeker", seekerRoutes);
app.use("/jhire/hr", hrRoutes);
app.use("/jhire/jobs", jobRoutes);
app.use('/jhire/auth',authRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to JHire");
});
app.get("/jhire", (req, res) => {
    res.send("Welcome to JHire Home Page");
  });
module.exports = app;
