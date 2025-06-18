// 📁 routes/statisticsRoutes.js
const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/statistics', statisticsController.getStatisticsPage);

module.exports = router;
