const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  companyName: String,
  location: String,
  description: String,
  notification: String,
  postedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Job", jobSchema);
