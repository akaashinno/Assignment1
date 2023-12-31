const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const Role = sequelize.define("roles", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: Sequelize.STRING,
});

module.exports = Role;
