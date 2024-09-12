const {
  getProjects,
  getProjectDescription,
  createProject,
  editProject,
  deleteProject,
  changeStudentStatus,
  getProjectApplicants,
  acceptStudent,
  rejectStudent,
} = require("../controllers/faculty");

const router = require("express").Router();

router.get("/getprojects", getProjects);
router.post("/getprojectdescription", getProjectDescription);
router.post("/createproject", createProject);
router.post("/editproject", editProject);
router.post("/getprojectapplicants", getProjectApplicants);
router.post("/acceptstudent", acceptStudent);
router.post("/rejectstudent", rejectStudent);

module.exports = router;
