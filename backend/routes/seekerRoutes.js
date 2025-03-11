const seekerController = require('../controllers/seekerController');
const express = require('express');
const updateSeekerProfile=require('../controllers/updateSeekerProfile');
const authenticateUser = require('../middlewares/authMiddleware');
const router = express.Router();
router.get('/', seekerController.getAllSeekers);
router.get('/:id', seekerController.getSeekerById);
router.post('/register', seekerController.registerSeeker);
router.put("/update-profile/:id", authenticateUser,updateSeekerProfile);
router.get("/applied/:id",seekerController.getSavedJobs)
router.get("/wishlist/:id",seekerController.getWishlist)
module.exports = router;