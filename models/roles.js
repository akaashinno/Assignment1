const Sequelize = require("sequelize");
const sequelize = require("../database/db");
const role = sequelize.define("role", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.STRING,
});

module.exports = role;
