const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "UrbanGrid Backend is running!",
    service: "UrbanGrid API",
  });
});

// API health route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    message: "Backend is ready to receive requests.",
    timestamp: new Date().toISOString(),
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// Start server
app.listen(PORT, () => {
  console.log("------------------------------------");
  console.log("       URBANGRID BACKEND");
  console.log("------------------------------------");
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Status: Ready");
});
