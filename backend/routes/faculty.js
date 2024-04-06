const {getProjects,getProjectDescrition,createProject, editProject,deleteProject,changeStudentStatus,getProjectApplicants} = require('../controllers/faculty');

const router = require('express').Router();

router.get('/getprojects', getProjects);
router.post('/getprojectdescription',getProjectDescrition);
router.post('/createproject',createProject);
router.post('/editproject',editProject);
router.post('/deleteproject',deleteProject);
router.post('/changestudentstatus',changeStudentStatus);
router.post('/getprojectapplicants',getProjectApplicants);

module.exports = router;