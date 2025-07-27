const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");
const Student = require("./models/Student");
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 5000;
// const admin = require("firebase-admin");
// const serviceAccount = require("./config/firebase-service-account.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// ✅ View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourFallbackSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  })
);

// ✅ Flash Messages Middleware
app.use(flash());

// ✅ Global Template Variables for EJS
app.use((req, res, next) => {
  res.locals.student = req.session.student || null;
  res.locals.college = req.session.college || null;
  res.locals.company = req.session.company || null;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// ✅ Test Student Signup Route
app.get("/test-student-signup", async (req, res) => {
  const testStudent = new Student({
    name: "Test Student",
    email: "teststudent@example.com",
    password: "123456",
    phone: "9999999999",
    regd_no: "REG123456",
    semester: 6,
  });

  try {
    await testStudent.save();
    res.send("✅ Test student signed up and added to database.");
  } catch (error) {
    console.error("❌ Error adding test student:", error.message);
    res.status(500).send("Failed to insert test student.");
  }
});

// ✅ Student Login Route
app.post("/login/student", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      req.flash("error_msg", "No account found with this email.");
      return res.redirect("/login/student");
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      req.flash("error_msg", "Incorrect password.");
      return res.redirect("/login/student");
    }

    req.session.studentId = student._id;
    req.session.student = student;
    req.flash("success_msg", "Login successful!");
    res.redirect("/dashboard");

  } catch (error) {
    console.error("Login Error:", error.message);
    req.flash("error_msg", "Something went wrong.");
    res.redirect("/login/student");
  }
});
// ✅ Import Routes
const indexRoutes = require("./routes/index");
const studentRoutes = require("./routes/student");
const collegeRoutes = require("./routes/college");
const companyRoutes = require("./routes/company");
const trainingRoutes = require("./routes/training");
const placementRoutes = require("./routes/placement");
const statisticsRoutes = require("./routes/statistics");
const blogRoutes = require("./routes/blog");
const dashboardRoutes = require("./routes/dashboard");
const authRoutes = require("./routes/auth"); // ← if you have /forgot-password here

// ✅ Mount Routes
app.use("/", indexRoutes);
app.use("/", studentRoutes);
app.use("/", collegeRoutes);
app.use("/", companyRoutes);
app.use("/", trainingRoutes);
app.use("/", placementRoutes);
app.use("/", statisticsRoutes);
app.use("/", blogRoutes);
app.use("/", dashboardRoutes);
app.use("/", authRoutes); // ← add this only if you have a separate auth route file

// ✅ Forgot Password & Reset Password Route Pages (Direct if needed)
const authController = require('./controllers/authController');
app.get('/reset-password/:token', authController.getResetPasswordPage);
app.post('/reset-password/:token', authController.postResetPassword);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
