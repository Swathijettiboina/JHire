const seekerController = require('../controllers/seekerController');
const express = require('express');
const router = express.Router();
router.get('/', seekerController.getAllSeekers);
router.get('/:id', seekerController.getSeekerById);
router.post('/register', seekerController.registerSeeker);
module.exports = router;