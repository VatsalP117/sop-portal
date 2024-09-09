const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
const Faculty = require("../models/Faculty");
const Project = require("../models/Project");
const Student = require("../models/Student");
const User = require("../models/User");
const ProjectStudent = require("../models/ProjectStudent");
const sequelize = new Sequelize(process.env.MYSQL_URL, { logging: false }); // Example for sqlite

Project.init(sequelize);
User.init(sequelize);
ProjectStudent.init(sequelize);

Project.associate({ User });
User.associate({ Project });
console.log("models initialized");
// sequelize
//   .sync()
//   .then(() => {
//     console.log("tables synced");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

module.exports = { sequelize, Faculty, Project, Student, ProjectStudent };
