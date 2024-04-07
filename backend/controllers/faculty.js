const { get } = require("mongoose");
const Faculty = require("../models/Faculty");
const Project = require("../models/Project");
const Student = require("../models/Student");

const getProjects = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.mongoid).populate(
      "projects"
    );
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    const projects = faculty.projects;
    const new_projects = projects.map((project) => {
      return {
        id: project._id,
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

const getProjectDescrition = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.projectid;
    if (!id) {
      return res.status(402).json({ message: "project id not found" });
    }
    const project = await Project.findOne({ _id: id });
    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    return res.status(200).json({
      id: project._id,
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
    const title = req.body.project_title;
    const status = req.body.status;
    const date = req.body.date;
    const gpsrn = req.body.gpsrn;
    const description = req.body.description;
    const tags = req.body.tags;
    const faculty = await Faculty.findById(req.user.mongoid);

    if (!faculty) {
      return res.status(404).send("faculty not found");
    }
    const new_project = new Project({
      title: title,
      description: JSON.stringify(description),
      faculty: faculty._id,
      tags: tags.join(","),
      date: date,
      status: status,
      date: date,
      gpsrn: gpsrn,
    });
    const saved_project = await new_project.save();
    faculty.projects.push(saved_project._id);
    await faculty.save();
    return res.status(200).json({ message: "Project created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const editProject = async (req, res) => {
  try {
    const id = req.body.projectid;
    const title = req.body.project_title;
    const status = req.body.status;
    const date = req.body.date;
    const gpsrn = req.body.gpsrn;
    const description = req.body.description;
    const tags = req.body.tags;
    const project = await Project.findOne({ _id: id });
    if (!project) {
      return res.status(404).send("project not found");
    }
    project.title = title;
    project.description = JSON.stringify(description);
    project.tags = tags.join(",");
    project.date = date;
    project.status = status;
    project.gpsrn = gpsrn;
    await project.save();
    return res.status(200).json({ message: "Project edited successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.body.projectid;
    const project = await Project.findOne({ _id: id });
    if (!project) {
      return res.status(404).send("project not found");
    }
    await Project.deleteOne({ _id: id });
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const changeStudentStatus = async (req, res) => {
  try {
    const id = req.body.projectid;
    const studentid = req.body.studentid;
    const status = req.body.status;
    const project = await Project.findOne({ _id: id });
    if (!project) {
      return res.status(404).send("project not found");
    }
    const student = await Student.findOne({ _id: studentid });
    if (!student) {
      return res.status(404).send("student not found");
    }
    const student_index = project.students.findIndex((student) => {
      return student.id == studentid;
    });
    project.students[student_index].status = status;
    await project.save();
    const project_index = student.projects.findIndex((project) => {
      return project.id == id;
    });
    student.projects[project_index].status = status;
    await student.save();
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
    const project = await Project.findOne({ _id: id });
    if (!project) {
      return res.status(404).send("project not found");
    }
    const students = project.students;
    const new_students = [];
    for(let i=0;i<students.length;i++){
      const student = await Student.findById(students[i].id);
      new_students.push({
        name: student.name,
        resume: student.resume,
        cgpa : Number(student.cgpa),
        status: students[i].status,
        id: student._id,
        projectId: id,
      });
    }
    return res.status(200).json(new_students);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const acceptStudent = async (req, res) => {
  try {
    const id = req.body.projectid;
    const studentid = req.body.studentid;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).send("project not found");
    }
    const student = await Student.findById(studentid);
    if (!student) {
      return res.status(404).send("student not found");
    }
    const student_index = project.students.findIndex((student) => {
      return student.id == studentid;
    });
    if (student_index == -1) {
      return res.status(404).send("student not found in project");
    }
    project.students[student_index].status = "Accepted";
    await project.save();
    const project_index = student.projects.findIndex((project) => {
      return project.id == id;
    });
    if (project_index == -1) {
      return res.status(404).send("project not found in student");
    }
    student.projects[project_index].status = "Accepted";
    await student.save();
    return res.status(200).json({ message: "Student accepted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

const rejectStudent = async (req, res) => {
  try {
    const id = req.body.projectid;
    const studentid = req.body.studentid;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).send("project not found");
    }
    const student = await Student.findById(studentid);
    if (!student) {
      return res.status(404).send("student not found");
    }
    const student_index = project.students.findIndex((student) => {
      return student.id == studentid;
    });
    if (student_index == -1) {
      return res.status(404).send("student not found");
    }
    project.students[student_index].status = "Rejected";
    await project.save();
    const project_index = student.projects.findIndex((project) => {
      return project.id == id;
    });
    if (project_index == -1) {
      return res.status(404).send("project not found");
    }
    student.projects[project_index].status = "Rejected";
    await student.save();
    return res.status(200).json({ message: "Student rejected successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getProjects,
  getProjectDescrition,
  createProject,
  editProject,
  deleteProject,
  changeStudentStatus,
  getProjectApplicants,
  acceptStudent,
  rejectStudent
};
