const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  location: String,
  description: String,
  notification: String,

  // ✅ New fields
  jobId: {
    type: String,
    unique: true,
    required: true
  },
  lastDateToApply: {
    type: Date,
    required: true
  },
  applyLink: {
    type: String,
    required: true
  },
  salary: String,
  numberOfOpenings: {
    type: Number,
    default: 1
  },

  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Job", jobSchema);
