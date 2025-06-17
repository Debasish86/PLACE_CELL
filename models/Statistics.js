const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema({
  no_of_companies: Number,
  no_of_eligible_students: Number,
  no_of_placed_students: Number,
  updated_at: Date
});

module.exports = mongoose.model("Statistics", statisticsSchema);
