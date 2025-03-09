const jobController = require('../controllers/jobController');
const express = require('express');
const router = express.Router();

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
module.exports = router;