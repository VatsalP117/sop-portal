
const { Op } = require("sequelize");
const Faculty = require("../models/Faculty");
const Project = require("../models/Project");
const Student = require("../models/Student");
const ProjectStudent = require("../models/ProjectStudent");
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

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: Faculty,
          as: "faculty",
          attributes: ["name"],
        },
      ],
    });
    if (!projects.length) {
      return res.status(404).json({ message: "No projects found" });
    }
    const new_projects = projects.map((project) => {
      return {
        id: project.id,
        project_name: project.title,
        status: project.status,
        tags: project.tags.split(","),
        professor: project.faculty.name,
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
    const project = await Project.findByPk(id, {
      include: [
        {
          model: Faculty,
          as: "faculty",
          attributes: ["name"],
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

const applyForProject = async (req, res) => {
  try {
    const id = req.body.projectid;
    if (!id) {
      return res.status(402).send("project id not found");
    }

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).send("project not found");
    }

    const student = await Student.findByPk(req.user.id);
    if (!student) {
      return res.status(404).send("student not found");
    }

    if (!student.cgpa || !student.resume) {
      return res.status(400).send("Please upload your details first");
    }

    const applied = await ProjectStudent.findOne({
      where: {
        projectId: id,
        studentId: student.id,
      },
    });
    if (applied) {
      return res.status(400).send("Student already applied for this project");
    }

    await ProjectStudent.create({
      projectId: project.id,
      studentId: student.id,
      status: "Pending",
    });

    return res.status(200).send("Applied for project successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const uploadStudentDetails = async (req, res) => {
  try {
    const student = await Student.findByPk(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    await student.update({
      cgpa: req.body.cgpa,
      resume: req.body.resume,
    });
    return res
      .status(200)
      .json({ message: "Student details updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getStudentProjects = async (req, res) => {
  try {
    const student = await Student.findByPk(req.user.id, {
      include: [
        {
          model: Project,
          as: "projects",
          through: { attributes: ["status"] },
        },
      ],
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    if (!student.projects.length) {
      return res.status(404).json({ message: "No projects found" });
    }
    const new_projects = student.projects.map((project) => ({
      title: project.title,
      status: project.ProjectStudent.status,
    }));
    return res.status(200).json(new_projects);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudentDetails,
  getAllProjects,
  getProjectDescription,
  applyForProject,
  uploadStudentDetails,
  getStudentProjects,
};
