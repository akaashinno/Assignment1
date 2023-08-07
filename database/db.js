const Sequelize = require("sequelize");

// const {databaseName,dbUserName,dbPassword}

const sequelize = new Sequelize("roles", "root", "akash123", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

try {
  sequelize.authenticate();
  console.log("Database connected successfully");
} catch (error) {
  console.log(`Unable to connect to the database ${error}`);
}

module.exports = sequelize;
