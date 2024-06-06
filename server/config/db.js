const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Academy", "Ehab", "1234", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
