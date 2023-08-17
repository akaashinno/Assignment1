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
    Type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    Type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    Type: Sequelize.STRING,
    allowNull: false,
  },
  pin_code: {
    Type: Sequelize.INTEGER,
    allowNull: false,
  },
  phone_number: {
    Type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    Type: Sequelize.STRING,
    allowNull: false,
  },
});

Address.belongsTo(User, { foreignKey: "user_id" });

module.exports = Address;
