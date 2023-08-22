const Sequelize = require("sequelize");

const sequelize = require("../database/db");
const Role = require("../models/roles");
const address = require("./address");

const user = sequelize.define(
  "user",
  {
    username: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emailId: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING(30),
    },
    roleId: {
      type: Sequelize.INTEGER,
      reference: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

user.hasMany(address, { as: "addressList" });
address.belongsTo(user);

module.exports = user;
