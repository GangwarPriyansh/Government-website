// dbadmin.js
const mongoose = require('mongoose');
const adminDbUrl = "mongodb://localhost:27017/admininfo"; 

// Default connection for the admin database
mongoose.connect(adminDbUrl); 

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Admin database is connected");
});

db.on('disconnected', () => {
    console.log("Admin database is disconnected");
});

db.on('error', (error) => {
    console.error("Error in admin database connection:", error);
});

module.exports = db;
