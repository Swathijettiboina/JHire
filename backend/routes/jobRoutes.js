const jobController = require('../controllers/jobController');
const {postJob}=require('../controllers/postJob');
const authenticateUser=require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post("/", authenticateUser, postJob); // Apply middleware here
module.exports = router;