const { Op } = require("sequelize");
const Faculty = require("../models/Faculty");
const Project = require("../models/Project");
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
    const faculty = await Faculty.findByPk(req.user.id, {
      include: [
        {
          model: Project,
          as: "projects",
        },
      ],
    });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    const new_projects = faculty.projects.map((project) => {
      return {
        id: project.id,
        project_name: project.title,
        status: project.status,
        tags: project.tags.split(","),
        professor: faculty.name,
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
    //console.log(req.body);
    const id = req.body.projectid;
    if (!id) {
      return res.status(402).json({ message: "project id not found" });
    }
    const project = await Project.findByPk(id, {
      include: [
        {
          model: Faculty,
          as: "faculty",
        },
      ],
    });
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    return res.status(200).json({
      id: project.id,
      project_title: project.title,
      status: project.status,
      tags: project.tags.split(","),
      professor: project.faculty.name,
      date: project.date,
      description: JSON.parse(project.description),
      gpsrn: project.gpsrn,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    console.log(req.body);
    const { project_title, status, date, gpsrn, description, tags } = req.body;
    const faculty = await Faculty.findByPk(req.user.id);

    if (!faculty) {
      return res.status(404).send("faculty not found");
    }
    const new_project = await Project.create({
      title: project_title,
      description: JSON.stringify(description),
      facultyId: faculty.id,
      tags: tags.join(","),
      date,
      status,
      gpsrn,
    });
    return res.status(200).json({ message: "Project created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const editProject = async (req, res) => {
  try {
    const { projectid, project_title, status, date, gpsrn, description, tags } =
      req.body;
    const project = await Project.findByPk(projectid);
    if (!project) {
      return res.status(404).send("project not found");
    }
    await project.update({
      title: project_title,
      description: JSON.stringify(description),
      tags: tags.join(","),
      date,
      status,
      gpsrn,
    });
    return res.status(200).json({ message: "Project edited successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.body.projectid;
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).send("project not found");
    }
    await project.destroy();
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const changeStudentStatus = async (req, res) => {
  try {
    const { projectid, studentid, status } = req.body;
    const projectStudent = await ProjectStudent.findOne({
      where: {
        projectId: projectid,
        studentId: studentid,
      },
    });
    if (!projectStudent) {
      return res.status(404).send("project-student association not found");
    }
    await projectStudent.update({ status });
    return res
      .status(200)
      .json({ message: "Student status changed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
const getProjectApplicants = async (req, res) => {
  try {
    const id = req.body.projectid;
    const project = await Project.findByPk(id, {
      include: [
        {
          model: Student,
          as: "students",
          through: { attributes: ["status"] },
        },
      ],
    });
    if (!project) {
      return res.status(404).send("project not found");
    }

    const new_students = await Promise.all(
      project.students.map(async (student) => {
        let pj = await ProjectStudent.findOne({
          where: {
            projectId: id,
            studentId: student.id,
          },
        });
        return {
          name: student.name,
          resume: student.resume,
          cgpa: Number(student.cgpa),
          status: student.ProjectStudent.status,
          id: student.id,
          projectId: id,
          remarks: pj ? pj.remarks : null,
          category: pj ? pj.category : null,
        };
      })
    );
    return res.status(200).json(new_students);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
const acceptStudent = async (req, res) => {
  try {
    const { projectid, studentid } = req.body;
    const student = await Student.findByPk(studentid);
    const project = await Project.findByPk(projectid);
    const projectStudent = await ProjectStudent.findOne({
      where: {
        projectId: projectid,
        studentId: studentid,
      },
    });
    if (!projectStudent) {
      return res.status(404).send("project-student association not found");
    }
    await projectStudent.update({ status: "Accepted" });
    sendMail(student.email, acceptance_text, project.gpsrn, project.title);
    return res.status(200).json({ message: "Student accepted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const rejectStudent = async (req, res) => {
  try {
    const { projectid, studentid } = req.body;
    const student = await Student.findByPk(studentid);
    const project = await Project.findByPk(projectid);
    const projectStudent = await ProjectStudent.findOne({
      where: {
        projectId: projectid,
        studentId: studentid,
      },
    });
    if (!projectStudent) {
      return res.status(404).send("project-student association not found");
    }
    await projectStudent.update({ status: "Rejected" });
    sendMail(student.email, rejection_text, project.gpsrn, project.title);
    return res.status(200).json({ message: "Student rejected successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectDescription,
  createProject,
  editProject,
  deleteProject,
  changeStudentStatus,
  getProjectApplicants,
  acceptStudent,
  rejectStudent,
};
