const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

module.exports = mongoose.model("Assessment", assessmentSchema);
