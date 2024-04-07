const {getStudentDetails,getAllprojects,getProjectDescrition,applyForProject,uploadStudentDetails,getStudentProjects} = require('../controllers/student');

const router = require('express').Router();

router.get('/getdetails', getStudentDetails);

router.get('/getallprojects',getAllprojects);

router.post('/getprojectdescription',getProjectDescrition);

router.post('/applyforproject',applyForProject);

router.post('/uploadstudentdetails',uploadStudentDetails);

router.get('/getstudentprojects',getStudentProjects);

module.exports = router;