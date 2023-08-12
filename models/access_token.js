const Sequelize = require("sequelize");
const sequelize = require("../database/db");
const User = require("./users");

const Access_Token = sequelize.define("Access_Tokens", {
  user_id: {
    type: Sequelize.INTEGER,

    references: {
      model: User,
      key: "id",
    },
  },
  access_token: {
    type: Sequelize.STRING,
  },
  expiry: Sequelize.STRING,
});

Access_Token.belongsTo(User, { foreignKey: "user_id" });

module.exports = Access_Token;
