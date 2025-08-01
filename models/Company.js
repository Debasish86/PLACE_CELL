const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  unicode: String
});

module.exports = mongoose.model("Company", companySchema);
