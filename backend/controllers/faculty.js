const { Op } = require("sequelize");
const Faculty = require("../models/Faculty");
const Project = require("../models/Project");
const User = require("../models/User");
const Student = require("../models/Student");
const ProjectStudent = require("../models/ProjectStudent");
const nodemailer = require("nodemailer");
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
const acceptance_text = "Your application has been accepted.";
const rejection_text = "Your application has been rejected.";
function sendMail(to, text, project_code, project_title) {
  const mailOptions = {
    from: "csistest0@gmail.com",
    to: to,
    subject: "Your project application has been reviewed.",
    text: `Regarding your application for project ${project_title} (${project_code}).${text}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}
const getProjects = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Project,
          as: "projects", // Changed from "facultyProjects" to "projects"
        },
      ],
    });
    if (!user || !user.users_type.match(/Professor/i)) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    const new_projects = user.projects.map((project) => ({
      id: project.project_id,
      project_name: project.title,
      status: project.status,
      tags: project.tags.split(","),
      professor: user.users_name,
    }));
    return res.status(200).json(new_projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getProjectDescription = async (req, res) => {
  try {
    const id = req.body.projectid;
    if (!id) {
      return res.status(400).json({ message: "Project ID not found" });
    }
    const project = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: "faculty",
        },
      ],
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json({
      id: project.project_id,
      project_title: project.title,
      status: project.status,
      tags: project.tags.split(","),
      professor: project.faculty.users_name,
      date: project.date,
      description: JSON.parse(project.description),
      gpsrn: project.gpsrn,
      minStudents: project.minStudents,
      maxStudents: project.maxStudents,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const {
      project_title,
      status,
      date,
      gpsrn,
      description,
      tags,
      minStudents,
      maxStudents,
    } = req.body;
    const faculty = await User.findByPk(req.user.id);

    if (!faculty || !faculty.users_type.match(/Professor/i)) {
      return res.status(404).send("Faculty not found");
    }
    const new_project = await Project.create({
      title: project_title,
      description: JSON.stringify(description),
      facultyId: faculty.users_id,
      tags: tags.join(","),
      date,
      status,
      gpsrn,
      minStudents,
      maxStudents,
    });
    return res.status(200).json({ message: "Project created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const editProject = async (req, res) => {
  try {
    const {
      projectid,
      project_title,
      status,
      date,
      gpsrn,
      description,
      tags,
      minStudents,
      maxStudents,
    } = req.body;
    const project = await Project.findByPk(projectid);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    await project.update({
      title: project_title,
      description: JSON.stringify(description),
      tags: tags.join(","),
      date,
      status,
      gpsrn,
      minStudents,
      maxStudents,
    });
    return res.status(200).json({ message: "Project edited successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getProjectApplicants = async (req, res) => {
  try {
    const id = req.body.projectid;
    const project = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: "students",
          through: { attributes: ["status"] },
          //where clause with multiple conditions user_type can be fdstudent or hdstudent or phdstudent
          where: {
            users_type: { [Op.or]: ["fdstudent", "hdstudent", "phdstudent"] },
          },
        },
      ],
    });
    if (!project) {
      return res.status(404).send("Project not found");
    }

    const new_students = await Promise.all(
      project.students.map(async (student) => {
        let pj = await ProjectStudent.findOne({
          where: {
            project_id: id,
            users_id: student.users_id,
          },
        });
        return {
          name: student.users_name,
          resume: student.resume,
          cgpa: Number(student.cgpa),
          status: student.ProjectStudent.status,
          id: student.users_id,
          projectId: id,
          remarks: pj ? pj.remarks : null,
          category: pj ? pj.category : null,
        };
      })
    );
    return res.status(200).json(new_students);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const acceptStudent = async (req, res) => {
  try {
    const { projectid, studentid } = req.body;
    const student = await User.findByPk(studentid);
    const project = await Project.findByPk(projectid);
    const projectStudent = await ProjectStudent.findOne({
      where: {
        project_id: projectid,
        users_id: studentid,
      },
    });
    if (!projectStudent) {
      return res.status(404).send("Project-student association not found");
    }
    await projectStudent.update({ status: "Accepted" });
    sendMail(
      student.users_email_id,
      acceptance_text,
      project.gpsrn,
      project.title
    );
    return res.status(200).json({ message: "Student accepted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const rejectStudent = async (req, res) => {
  try {
    const { projectid, studentid } = req.body;
    const student = await User.findByPk(studentid);
    const project = await Project.findByPk(projectid);
    const projectStudent = await ProjectStudent.findOne({
      where: {
        project_id: projectid,
        users_id: studentid,
      },
    });
    if (!projectStudent) {
      return res.status(404).send("Project-student association not found");
    }
    await projectStudent.update({ status: "Rejected" });
    sendMail(
      student.users_email_id,
      rejection_text,
      project.gpsrn,
      project.title
    );
    return res.status(200).json({ message: "Student rejected successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getProjects,
  getProjectDescription,
  createProject,
  editProject,
  getProjectApplicants,
  acceptStudent,
  rejectStudent,
};
