const { Sequelize } = require("sequelize");

function customLogger(msg) {
  if (!msg.startsWith("Executing (default)")) {
    console.error(msg); // Log only errors or important messages
  }
}

const sequelize = new Sequelize("Academy", "Ehab", "1234", {
  host: "localhost",
  dialect: "postgres",
  logging: customLogger,
});

module.exports = sequelize;
