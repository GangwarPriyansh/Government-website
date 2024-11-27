const mongoose = require('mongoose');

const feedbackDbUrl = "mongodb://localhost:27017/feedbackDB";

const feedbackConnection = mongoose.createConnection(feedbackDbUrl);

feedbackConnection.on('connected', () => {
    console.log("Feedback database is connected");
});

feedbackConnection.on('disconnected', () => {
    console.log("Feedback database is disconnected");
});

feedbackConnection.on('error', (error) => {
    console.error("Error in feedback database connection:", error);
});

module.exports = feedbackConnection;
