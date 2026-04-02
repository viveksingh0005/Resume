const Feedback = require('../models/feedback.model');

// Submit new feedback (Only authenticated users)
const submitFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ 
        success: false, 
        message: "Rating and comment are required" 
      });
    }

    const feedback = await Feedback.create({
      user: req.user.id,   // Comes from protect middleware
      rating,
      comment
    });

    // Populate user name before sending response
    await feedback.populate('user', 'username email');

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while submitting feedback" 
    });
  }
};

// Get all feedbacks with pagination
const getAllFeedbacks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'username email')
      .lean();

    const total = await Feedback.countDocuments();

    res.json({
      success: true,
      feedbacks,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalFeedbacks: total,
      hasMore: skip + feedbacks.length < total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { submitFeedback, getAllFeedbacks };