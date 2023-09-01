const Sequelize = require("sequelize");
const sequelize = require("../database/db");
const User = require("../models/users");
const address = sequelize.define(
  "address",
  {
    address: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    pin_code: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    phone_no: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: User,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = address;
