const {getStudentDetails,getAllprojects,getProjectDescrition,applyForProject} = require('../controllers/student');

const router = require('express').Router();

router.get('/getdetails', getStudentDetails);

router.get('/getallprojects',getAllprojects);

router.post('/getprojectdescription',getProjectDescrition);

router.post('/applyforproject',applyForProject);

module.exports = router;