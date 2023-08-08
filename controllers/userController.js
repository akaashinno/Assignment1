const User = require("../models/users");
const sequelize = require("../database/db");
const bcrypt = require("bcrypt");

module.exports = {
  addUser: async (req, res) => {
    try {
      const {
        roleId,
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
          roleId,
          username,
          password: securePassword,
          emailId,
          firstName,
          lastName,
        });
        createUser.save();
        res.status(200).send({
          message: "data saved successfully",
        });
      } else {
        res.status(500).send("Confirm Password not matched");
      }
    } catch (err) {
      console.log("Error occurred:", err.status);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
