const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require("path");
const flash = require("connect-flash");
require("dotenv").config();

const Student = require("./models/Student"); // ✅ Added

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourFallbackSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

// Flash messages
app.use(flash());

// Session data for EJS views
app.use((req, res, next) => {
  res.locals.student = req.session.student || null;
  res.locals.college = req.session.college || null;
  res.locals.company = req.session.company || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// ✅ Test student route
app.get('/test-student-signup', async (req, res) => {
  const testStudent = new Student({
    name: "Test Student",
    email: "teststudent@example.com",
    password: "123456",
    phone: "9999999999",
    regd_no: "REG123456",
    semester: 6
  });

  try {
    await testStudent.save();
    res.send("✅ Test student signed up and added to database.");
  } catch (error) {
    console.error("❌ Error adding test student:", error.message);
    res.status(500).send("Failed to insert test student.");
  }
});

// ✅ Student login route
app.post('/login/student', async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });

    if (student && student.password === password) {
      req.session.studentId = student._id;
      req.session.student = student;
      req.flash('success_msg', 'Login successful!');
      return res.redirect('/dashboard');
    }

    req.flash('error_msg', 'Invalid credentials');
    res.redirect('/login/student');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Something went wrong.');
    res.redirect('/login/student');
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
const dashboardRoutes = require('./routes/dashboard');

// Mount routes
app.use("/", indexRoutes);
app.use("/", studentRoutes);
app.use("/", collegeRoutes);
app.use("/", companyRoutes);
app.use("/", trainingRoutes);
app.use("/", placementRoutes);
app.use("/", statisticsRoutes);
app.use("/", blogRoutes);
app.use("/", dashboardRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
