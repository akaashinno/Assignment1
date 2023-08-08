const Sequelize = require("sequelize");
const sequelize = require("../database/db");
const Role = require("./roles");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roleId: {
    type: Sequelize.INTEGER,
    references: {
      model: Role,
      key: "id",
    },
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  emailId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;
