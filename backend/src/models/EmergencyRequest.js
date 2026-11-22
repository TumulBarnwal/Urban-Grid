
const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["Ambulance", "Police", "Fire Truck"],
    },

    intersectionId: {
      type: String,
      required: true,
      trim: true,
    },

    approach: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Priority Active", "Completed"],
      default: "Pending",
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "EmergencyRequest",
  }
);

module.exports = mongoose.model(
  "EmergencyRequest",
  emergencyRequestSchema
);
