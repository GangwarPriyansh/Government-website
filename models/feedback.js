// models/feedback.js
const mongoose = require("mongoose");

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
});

// Export the Feedback model
module.exports = mongoose.model("Feedback", feedbackSchema);
