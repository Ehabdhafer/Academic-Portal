const Courses = require("../models/course_model");

exports.postCourse = async (req, res) => {
  const { course_name, description, start_date, end_date } = req.body;
  const user_id = req.user.user_id;
  try {
    await Courses.create({
      course_name,
      description,
      start_date,
      end_date,
      teacher: user_id,
    });
    return res.status(201).json({ message: "New Course added successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
