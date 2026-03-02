const mongoose = require("mongoose");

const pgSchema = new mongoose.Schema(
  {
    pgName: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    foodFacility: {
      type: Boolean,
      default: false,
    },
    photos: {
      type: [String], // image URLs
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PG", pgSchema);
