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
