const express = require("express");
const router = express.Router();

router.get("/login/company", (req, res) => res.render("pages/loginCompany"));
router.get("/signup/company", (req, res) => res.render("pages/signupCompany"));
router.get("/hirewithus", (req, res) => res.render("pages/hireWithUs"));

module.exports = router;
