const Student = require('../models/Student');
const Project = require('../models/Project');
const { application } = require('express');

const getStudentDetails = async (req, res) => {
    try {
        const student = await Student.findById(req.user.mongoid);
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }
        return res.status(200).send({cgpa:student.cgpa,resume:student.resume});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

const getAllprojects = async (req,res) => {
    try {
        const projects = await Project.find().populate('faculty');
        if(!projects){
            return res.status(404).send({message: 'No projects found'});
        }
        const new_projects = projects.map((project)=>{
            return {
                id: project._id,
                project_title: project.title,
                status: project.status,
                tags: project.tags.split(','),
                professor: project.faculty.name,
            }
        })
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
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
        return res.status(200).send({
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
        return res.status(500).send({ message: error.message });
    }
}

const applyForProject = async (req,res) => {
    try {
        const id = req.body.projectid;
        if(!id){
            return res.status(402).send('project id not found')
        }

        const project = Project.findOne({_id:id})
        if(!project){
            return res.status(404).send('project not found')
        }

        const student = await Student.findById(req.user.mongoid);
        if(!student){
            return res.status(404).send('student not found')
        }

        const new_project = {
            id: project._id,
            status: 'pending'
        }
        student.projects.push(new_project);
        await student.save();

        const new_student = {
            id: student._id,
            status: 'pending'
        }
        project.students.push(new_student);
        await project.save();

        return res.status(200).send('Applied for project successfully');
    } catch(error){
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {getStudentDetails,getAllprojects,getProjectDescrition,applyForProject}