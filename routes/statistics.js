const express = require("express");
const router = express.Router();

router.get("/statistics", (req, res) => res.render("pages/statistics"));

module.exports = router;
