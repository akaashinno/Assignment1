const Sequelize = require("sequelize");
const sequelize = require("../database/db");
const User = require("./users");

const Address = sequelize.define("Addresses", {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  pin_code: Sequelize.INTEGER,
  phone_number: Sequelize.INTEGER,
  type: Sequelize.STRING,
});

Address.belongsTo(User, { foreignKey: "user_id" });

module.exports = Address;
