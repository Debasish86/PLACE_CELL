const express = require("express");
const router = express.Router();

router.get("/login/student", (req, res) => res.render("pages/loginStudent"));
router.get("/signup/student", (req, res) => res.render("pages/signupStudent"));

module.exports = router;
