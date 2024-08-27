const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
const Faculty = require("../models/Faculty");
const Project = require("../models/Project");
const Student = require("../models/Student");
const ProjectStudent = require("../models/ProjectStudent");
const sequelize = new Sequelize("mysql://root:bigchill@localhost:3306/sop"); // Example for sqlite
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// module.exports = mongoose;
Faculty.init(sequelize);
Project.init(sequelize);
Student.init(sequelize);
ProjectStudent.init(sequelize);

Faculty.associate({ Project });
Project.associate({ Faculty, Student });
Student.associate({ Project });
console.log("models initialized");
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("tables synced");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = { sequelize, Faculty, Project, Student, ProjectStudent };
