require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");
const passport = require('./config/passport');

// Import Routes
const authRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const alertsRoutes = require("./routes/alertsRoutes");
const businessRoutes = require("./routes/businessRoutes");
const routeRoutes = require("./routes/routeRoutes");

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());  // Parses JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded requests
app.use(cors());  // Handles Cross-Origin Requests
app.use(morgan("dev"));  // Logs requests
app.use(helmet());  // Security headers
app.use(passport.initialize()); // Initialize passport

// Example of a correct middleware function
app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/routes", routeRoutes);

// Connect to MongoDB
connectDB(); // Use the new MongoDB connection function

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
