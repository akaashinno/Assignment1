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
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pin_code: {
    type: Sequelize.INTEGER,
  },
  phone_number: {
    type: Sequelize.INTEGER,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Address.belongsTo(User, { foreignKey: "user_id" });

module.exports = Address;
