const express = require("express");
const path = require("path");
const dbadmin = require("./db/dbadmin"); // Ensure the correct file path
const bodyParser = require("body-parser");
const Register = require("./models/register"); // Ensure this is correctly imported

const app = express(); // Initialize app first
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "gov-website.html"));
});

app.get("/contact-us", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "contact-us.html"));
});

app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "success.html"));
});

app.get("/sign-up", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "sign-up.html"));
});

app.post("/signup", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const registerEmployee = new Register({
                name: req.body.fullname,
                email: req.body.email,
                date_of_birth: req.body.date_of_birth,
                password: password,
                confirmpassword: cpassword
            });

            const registered = await registerEmployee.save();
            res.redirect("/success");
        } else {
            res.send("Passwords do not match.");
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.get("/sign-in", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "sign-in.html"));
});

app.post("/signin", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Find user by email
        const user = await Register.findOne({ email: email });

        if (user) {
            // Check if password matches
            if (user.password === password) {
                res.redirect("/mainWebsite");  //dashboard vala website
            } else {
                res.send("Invalid credentials! Please check your password.");
            }
        } else {
            res.send("Email not found. Please create an account.");
        }
    } catch (err) {
        res.status(500).send("Server error. Please try again later.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
