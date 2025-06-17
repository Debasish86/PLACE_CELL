const express = require("express");
const router = express.Router();

router.get("/login/college", (req, res) => res.render("pages/loginCollege"));
router.get("/signup/college", (req, res) => res.render("pages/signupCollege"));

module.exports = router;
