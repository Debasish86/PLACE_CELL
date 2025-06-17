const express = require("express");
const router = express.Router();

router.get("/placement", (req, res) => res.render("pages/placement"));

module.exports = router;
