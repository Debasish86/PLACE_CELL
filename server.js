const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require("path");
const flash = require('connect-flash');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// To make flash messages accessible in all views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.get('/test-student-signup', async (req, res) => {
    const Student = require('./models/Student');
  
    const testStudent = new Student({
      name: "Test Student",
      email: "teststudent@example.com",
      password: "123456",
      phone: "9999999999",
      regd_no: "REG123456",
      semester: 6
      // You can add `college_id` later if needed
    });
  
    try {
      await testStudent.save();
      res.send("✅ Test student signed up and added to database.");
    } catch (error) {
      console.error("❌ Error adding test student:", error.message);
      res.status(500).send("Failed to insert test student.");
    }
  });
  

// Routes
const indexRoutes = require('./routes/index');
const studentRoutes = require('./routes/student');
const collegeRoutes = require('./routes/college');
const companyRoutes = require('./routes/company');
const trainingRoutes = require('./routes/training');
const placementRoutes = require('./routes/placement');
const statisticsRoutes = require('./routes/statistics');
const blogRoutes = require('./routes/blog');

app.use("/", indexRoutes);
app.use("/", studentRoutes);
app.use("/", collegeRoutes);
app.use("/", companyRoutes);
app.use("/", trainingRoutes);
app.use("/", placementRoutes);
app.use("/", statisticsRoutes);
app.use("/", blogRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});