const jobController = require('../controllers/jobController');
const filteredJobs = require('../controllers/filteredJobsController');
const express = require('express');
const router = express.Router();

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.get("/filteredjobs", filteredJobs.getFilteredJobs);
module.exports = router;