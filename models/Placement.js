const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  status: String,
  package: Number,
  placed_on: Date
});

module.exports = mongoose.model("Placement", placementSchema);
