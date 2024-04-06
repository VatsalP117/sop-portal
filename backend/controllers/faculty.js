const { get } = require('mongoose');
const Faculty = require('../models/Faculty');
const Project = require('../models/Project');
const Student = require('../models/Student');

const getProjects = async () => {
    try {
        const faculty = await Faculty.findById(req.user.mongoid).populate('projects');
        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }
        const projects = faculty.projects;
        const new_projects = projects.map((project)=>{
            return {
                id: project._id,
                project_title: project.title,
                status: project.status,
                tags: project.tags.split(','),
                professor: project.faculty.name,
            }
        })
        return res.status(200).json(new_projects);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const getProjectDescrition = (req,res) => {
    try {
        const id = req.body.projectid;
        if(!id){
            return res.status(402).send('project id not found')
        }
        const project = Project.findOne({_id:id})
        if(!project){
            return res.status(404).send('project not found')
        }
        return res.status(200).json({
            id: project._id,
            project_title: project.title,
            status: project.status,
            tags: project.tags.split(','),
            professor: project.faculty.name,
            date: project.date, 
            description:project.description,
            gpsrn: project.gpsrn
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const createProject = async (req,res) => {
    try {
        const title = req.body.project_title;
        const status = req.body.status;
        const date = req.body.date;
        const gpsrn = req.body.gpsrn;
        const description = req.body.description;
        const tags = req.body.tags;
        const faculty = await Faculty.findById(req.user.mongoid);

        if(!faculty){
            return res.status(404).send('faculty not found')
        }
        const new_project = new Project({
            title: title,
            description: description,
            faculty: faculty._id,
            tags: tags.join(','),
            date: new Date(),
            status: status,
            date: date,
            gpsrn: gpsrn,
        });
        const saved_project = await new_project.save();
        faculty.projects.push(saved_project._id);
        await faculty.save();
        return res.status(200).json({message: 'Project created successfully'});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const editProject = async (req,res) => {
    try {
        const id = req.body.projectid;
        const title = req.body.project_title;
        const status = req.body.status;
        const date = req.body.date;
        const gpsrn = req.body.gpsrn;
        const description = req.body.description;
        const tags = req.body.tags;
        const project = Project.findOne({_id:id});
        if(!project){
            return res.status(404).send('project not found')
        }
        project.title = title;
        project.description = description;
        project.tags = tags.join(',');
        project.date = date;
        project.status = status;
        project.gpsrn = gpsrn;
        await project.save();
        return res.status(200).json({message: 'Project edited successfully'});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const deleteProject = async (req,res) => {
    try {
        const id = req.body.projectid;
        const project = Project.findOne({_id:id});
        if(!project){
            return res.status(404).send('project not found')
        }
        await Project.deleteOne({_id:id});
        return res.status(200).json({message: 'Project deleted successfully'});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const changeStudentStatus = async (req,res) => {
    try {
        const id = req.body.projectid;
        const studentid = req.body.studentid;
        const status = req.body.status;
        const project = Project.findOne({_id:id});
        if(!project){
            return res.status(404).send('project not found')
        }
        const student = Student.findOne({_id:studentid});
        if(!student){
            return res.status(404).send('student not found')
        }
        const student_index = project.students.findIndex((student)=>{
            return student.id == studentid;
        });
        project.students[student_index].status = status;
        await project.save();
        const project_index = student.projects.findIndex((project)=>{
            return project.id == id;
        });
        student.projects[project_index].status = status;
        await student.save();
        return res.status(200).json({message: 'Student status changed successfully'});
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const getProjectApplicants = async (req,res) => {
    try {
        const id = req.body.projectid;
        const project = Project.findOne({_id:id}).populate('students');
        if(!project){
            return res.status(404).send('project not found')
        }
        const students = project.students;
        const new_students = students.map((student)=>{
            return {
                id: student._id,
                name: student.name,
                status: student.status,
                resume: student.resume,
                cgpa: student.cgpa,
            }
        })
        return res.status(200).json(new_students);
    } catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message });
    }

}

module.exports = { getProjects,getProjectDescrition,createProject,editProject,deleteProject,changeStudentStatus,getProjectApplicants}