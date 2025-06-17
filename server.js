const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // ✅ Important for correct path resolution

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Home route
// app.get('/', (req, res) => {
//   res.render('pages/home'); // ✅ remove .ejs
// });

// Routes (Uncomment when ready)
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
