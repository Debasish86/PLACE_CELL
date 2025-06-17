const express = require("express");
const router = express.Router();

router.get("/blogs", (req, res) => res.render("pages/blogs"));
router.get("/exploreallcompanies", (req, res) => res.render("pages/exploreAllCompanies"));

module.exports = router;
