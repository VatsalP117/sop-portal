const {
  getStudentDetails,
  getAllProjects,
  getProjectDescription,
  applyForProject,
  getStudentProjects,
} = require("../controllers/student");

const router = require("express").Router();

router.get("/getdetails", getStudentDetails);

router.get("/getallprojects", getAllProjects);

router.post("/getprojectdescription", getProjectDescription);

router.post("/applyforproject", applyForProject);

//router.post("/uploadstudentdetails", uploadStudentDetails);

router.get("/getstudentprojects", getStudentProjects);

module.exports = router;
