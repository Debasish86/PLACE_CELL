const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("pages/home"));
router.get("/home", (req, res) => res.render("pages/home"));
router.get("/training", (req, res) => res.render("pages/training"));

router.get("/statistics", (req, res) => res.render("pages/statistics"));
router.get("/hirewithus", (req, res) => res.render("pages/hireWithUs"));
router.get("/blogs", (req, res) => res.render("pages/blogs"));
router.get("/exploreallcompanies", (req, res) => res.render("pages/exploreAllCompanies"));
router.get("/login",(req,res)=>res.render("pages/login"));

module.exports = router;
