const User = require("../models/users");
const sequelize = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      const access_token = jwt.sign(data, process.env.JWTSECRET);

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findOne({
        where: {
          id: userId,
        },
        attributes: { exclude: ["password"] },
      });
      res.status(200).send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      await user.destroy();
      // res.send(user);
      res.status(200).send({ message: "user deleted succesfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  },

  userList: async (req, res) => {
    try {
      const page = req.params.page;
      // console.log(page);
      const limit = 10;
      const skip = (page - 1) * limit;
      // console.log(skip);
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
        limit,
        offset: skip,
      });
      // console.log(users);
      // res.send("found");
      res.status(200).send(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  },
};
