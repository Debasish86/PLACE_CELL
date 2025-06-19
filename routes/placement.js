// routes/placement.js
const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');

router.get('/placement', trainingController.getPlacementPage);

module.exports = router;
