const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const Faculty = require("../models/Faculty");
const User = require("../models/User");
const Project = require("../models/Project");
const Student = require("../models/Student");
const ProjectStudent = require("../models/ProjectStudent");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
function sendMail(to, project_code, project_title) {
  const mailOptions = {
    from: "csistest0@gmail.com",
    to: to,
    subject: "Your project has a new application",
    text: `Your project ${project_title} (${project_code}) has a new application. Please review it.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}
const getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findByPk(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ cgpa: student.cgpa, resume: student.resume });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

//convert to using unified user model
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: "faculty",
        },
      ],
    });
    if (!projects.length) {
      return res.status(404).json({ message: "No projects found" });
    }
    const new_projects = projects.map((project) => {
      return {
        id: project.project_id,
        project_name: project.title,
        status: project.status,
        tags: project.tags.split(","),
        professor: project.faculty.users_name,
      };
    });
    return res.status(200).json(new_projects);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getProjectDescription = async (req, res) => {
  try {
    const id = req.body.projectid;
    if (!id) {
      return res.status(402).json({ message: "project id not found" });
    }
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    return res.status(200).json({
      id: project.project_id,
      project_title: project.title,
      status: project.status,
      tags: project.tags.split(","),
      //professor: project.faculty.name,
      date: project.date,
      description: JSON.parse(project.description),
      gpsrn: project.gpsrn,
      minStudents: project.minStudents,
      maxStudents: project.maxStudents,
    });
  } catch (error) {
    console.log("gaya hi nahi projectdescription");
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const applyForProject = async (req, res) => {
  try {
    const id = req.body.projectid;
    const remarks = req.body.remarks;
    const category = req.body.category;
    if (!id) {
      return res.status(402).send("project id not found");
    }

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).send("project not found");
    }

    const student = await User.findByPk(req.user.id);
    if (!student) {
      return res.status(404).send("student not found");
    }

    const applied = await ProjectStudent.findOne({
      where: {
        project_id: id,
        users_id: student.users_id,
      },
    });
    console.log("applied", applied);
    if (applied) {
      return res.status(400).send("Student already applied for this project");
    }

    await ProjectStudent.create({
      project_id: id,
      users_id: student.users_id,
      status: "Pending",
      remarks,
      category,
    });
    const faculty = await User.findByPk(project.facultyId);
    // console.log(faculty);
    sendMail(faculty.users_email_id, project.gpsrn, project.title);
    return res.status(200).send("Applied for project successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// const uploadStudentDetails = async (req, res) => {
//   try {
//     const student = await Student.findByPk(req.user.id);
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     await student.update({
//       cgpa: req.body.cgpa,
//       resume: req.body.resume,
//     });
//     return res
//       .status(200)
//       .json({ message: "Student details updated successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: error.message });
//   }
// };

const getStudentProjects = async (req, res) => {
  try {
    const student = await User.findByPk(req.user.id, {
      include: [
        {
          model: Project,
          as: "students", // This alias matches the one defined in the Project model
          through: {
            attributes: ["status", "remarks", "category"],
          },
        },
      ],
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.students.length) {
      return res.status(404).json({ message: "No projects found" });
    }

    const new_projects = student.students.map((project) => ({
      title: project.title,
      status: project.ProjectStudent.status,
    }));

    return res.status(200).json(new_projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentDetails,
  getAllProjects,
  getProjectDescription,
  applyForProject,

  getStudentProjects,
};
