const User = require("../models/users");
const sequelize = require("../database/db");
const bcrypt = require("bcrypt");

module.exports = {
  addUser: async (req, res) => {
    try {
      const {
        username,
        password,
        confirmPassword,
        emailId,
        firstName,
        lastName,
      } = req.body;
      if (password === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);

        const createUser = await User.create({
          username,
          password: securePassword,
          emailId,
          firstName,
          lastName,
        });
        // throw err;
        createUser.save();
        res.status(200).send({
          message: "data saved successfully",
          //   username,
          //   emailId,
          //   firstName,
          //   lastName,
        });
      } else {
        res.send("Password not matched");
      }
    } catch (err) {
      console.log("Error occurred:", err.status);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
