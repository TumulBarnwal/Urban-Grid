
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const PYTHON_SERVICE_URL = "http://127.0.0.1:8000";

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "UrbanGrid Backend is running!",
    service: "UrbanGrid API",
  });
});

// Node.js backend health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    message: "Backend is ready to receive requests.",
    timestamp: new Date().toISOString(),
  });
});

// Connect Node.js backend to Python service
app.get("/api/python/health", async (req, res) => {
  try {
    const pythonResponse = await fetch(
      `${PYTHON_SERVICE_URL}/api/health`
    );

    const pythonData = await pythonResponse.json();

    res.status(pythonResponse.status).json({
      success: true,
      message: "Node.js successfully contacted Python!",
      pythonService: pythonData,
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Could not connect to Python service.",
      error: error.message,
    });
  }
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
  console.log(`Python service: ${PYTHON_SERVICE_URL}`);
  console.log("Status: Ready");
});
