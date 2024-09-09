const express = require("express");

require("dotenv").config();
require("./controllers/db");
const Project = require("./models/Project");
const User = require("./models/User");
const ProjectStudent = require("./models/ProjectStudent");
const AuthRouter = require("./routes/auth");
const studentRouter = require("./routes/student");
const facultyRouter = require("./routes/faculty");
const {
  studentMiddleware,
  facultyMiddleware,
} = require("./controllers/middleware");
const session = require("express-session");
const passport = require("passport");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", AuthRouter);

app.use("/api/student", studentMiddleware, studentRouter);

app.use("/api/faculty", facultyMiddleware, facultyRouter);
app.get("/api/hello", async (req, res) => {
  const entries = await ProjectStudent.findAll();
  let csvContent = "data:text/csv;charset=utf-8,";
  const columns = [
    "project_id",
    "title",
    "faculty_name",
    "student_id",
    "student_name",
    "category",
  ];
  csvContent += columns.join(",") + "\r\n";
  for (let i = 0; i < entries.length; i++) {
    const student = await User.findByPk(entries[i].users_id);
    const project = await Project.findByPk(entries[i].project_id);
    const faculty = await User.findByPk(project.facultyId);
    console.log(student, faculty, project);
    if (entries[i].status == "Accepted") {
      console.log(entries[i].status);
      let rowArr = [
        project.project_id,
        project.title,
        faculty.users_name,
        student.users_id,
        student.users_name,
        entries[i].category,
      ];
      console.log(rowArr);
      let row = rowArr.join(",");
      csvContent += row + "\r\n";
    }
  }
  console.log(csvContent);
  res.send(csvContent);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
