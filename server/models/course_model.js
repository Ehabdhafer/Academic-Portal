const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user_model");

const Courses = sequelize.define("Course", {
  course_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  teacher: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue:
      "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webpfalse",
  },
});

Courses.belongsTo(User, { foreignKey: "teacher" });
User.hasMany(Courses, { foreignKey: "teacher" });

module.exports = Courses;
