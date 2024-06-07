const Courses = require("../models/course_model");
const { Op } = require("sequelize");
const User = require("../models/user_model");

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

exports.getCourses = async (req, res) => {
  try {
    const result = await Courses.findAll({
      where: {
        end_date: {
          [Op.gte]: new Date(),
        },
      },
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

exports.updateCourses = async (req, res) => {
  const { course_name, description, start_date, end_date } = req.body;
  const { id } = req.params;
  const user_id = req.user.user_id;
  try {
    const course = await Courses.findOne({ where: { id, teacher: user_id } });
    if (!course) {
      res.status(404).json({ message: "Course Not Found" });
    } else {
      await Courses.update(
        {
          course_name,
          description,
          start_date,
          end_date,
        },
        {
          where: { id: id, teacher: user_id },
        }
      );
      res.json({ message: "Course Updated Successfully" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
