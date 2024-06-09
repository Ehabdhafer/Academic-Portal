const { Router } = require("express");
const router = Router();
const CourseController = require("../controllers/CourseController");
const verify = require("../middlewares/authorizationJWT");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/postcourse",
  upload.single("image"),
  verify.authorize([1]),
  CourseController.postCourse
);
router.get("/getcourse", CourseController.getCourses);
router.get(
  "/getteachercourse",
  verify.authorize([1]),
  CourseController.getTCourses
);
router.get("/getcourse/:id", CourseController.getCourse);
router.put(
  "/updatecourse/:id",
  verify.authorize([1]),
  CourseController.updateCourses
);
router.put(
  "/deletecourse/:id",
  verify.authorize([1]),
  CourseController.deleteCourses
);

module.exports = router;
