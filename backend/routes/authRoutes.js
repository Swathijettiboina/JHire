const express = require("express");
const { loginUser,checkSession,logoutUser } = require("../controllers/authController");
const router = express.Router();

router.post("/login", loginUser);
router.get("/check-session",  checkSession);
router.post("/logout",  logoutUser);

module.exports = router;
