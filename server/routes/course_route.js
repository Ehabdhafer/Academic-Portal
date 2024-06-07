const { Router } = require("express");
const router = Router();
const CourseController = require("../controllers/CourseController");
const verify = require("../middlewares/authorizationJWT");

router.post("/postcourse", verify.authorize([1]), CourseController.postCourse);
router.get("/getcourse", CourseController.getCourses);
router.put(
  "/updatecourse/:id",
  verify.authorize([1]),
  CourseController.updateCourses
);

module.exports = router;
