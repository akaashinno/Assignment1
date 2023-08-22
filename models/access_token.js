const Sequelize = require("sequelize");
const sequelize = require("../database/db");
const Token = sequelize.define(
  "accessToken",
  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    token: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    expiryDate: {
      type: "TIMESTAMP",
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = Token;
