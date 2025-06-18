const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  unicode: String
});

module.exports = mongoose.model("College", collegeSchema);
