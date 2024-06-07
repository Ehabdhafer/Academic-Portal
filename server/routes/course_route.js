const { Router } = require("express");
const router = Router();
const CourseController = require("../controllers/CourseController");
const verify = require("../middlewares/authorizationJWT");

router.post("/postcourse", verify.authorize([1]), CourseController.postCourse);

module.exports = router;
