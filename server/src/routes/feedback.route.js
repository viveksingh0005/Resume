const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedbacks } = require('../controllers/feedback.controller');
const { authUser } = require('../middlewares/auth.middleware');   // Your existing auth middleware

// Protected route - only logged in users
router.post('/submit', authUser, submitFeedback);

// Public route - anyone can see reviews
router.get('/', getAllFeedbacks);

module.exports = router;