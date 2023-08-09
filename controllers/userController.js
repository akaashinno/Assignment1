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

        await User.create({
          roleId,
          username,
          password: securePassword,
          emailId,
          firstName,
          lastName,
        });
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

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const access_token = jwt.sign(data, process.env.jwtSecret);

      return res.status(200).json({ access_token });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred" });
    }
  },
};
