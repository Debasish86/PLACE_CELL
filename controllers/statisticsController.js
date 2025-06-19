// 📁 controllers/statisticsController.js
const Statistics = require('../models/Statistics');

exports.getStatisticsPage = async (req, res) => {
  try {
    let stats = await Statistics.findOne();

    if (!stats) {
      // Create sample data if none exists
      stats = new Statistics({
        no_of_companies: 15,
        no_of_eligible_students: 120,
        no_of_placed_students: 75
      });
      await stats.save();
    }

    res.render('pages/statistics', {
      companies: stats.no_of_companies,
      eligible: stats.no_of_eligible_students,
      placed: stats.no_of_placed_students
    });
  } catch (error) {
    console.error('Failed loading statistics:', error);
    res.status(500).send('Unable to load statistics');
  }
};
