// routes/placement.js
const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');

// 👇 This route now checks for login inside the controller
router.get('/placement', trainingController.getPlacementPage);

module.exports = router;
