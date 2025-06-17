const express = require("express");
const router = express.Router();

router.get("/trainings", (req, res) => res.render("pages/training"));
router.get("/login/student", (req, res) => res.render("pages/loginStudent"));
router.get("/signup/student", (req, res) => res.render("pages/signupStudent"));

module.exports = router;
