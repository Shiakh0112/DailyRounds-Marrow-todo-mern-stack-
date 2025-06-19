const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    tags: [String],
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
    assignedUsers: [String], // <-- FIXED: was [mongoose.Schema.Types.ObjectId]
    notes: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
