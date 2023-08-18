const User = require("../models/users");
const Address = require("../models/address");
const sequelize = require("../database/db");
const bcrypt = require("bcrypt");
let crypto = require("crypto");
const Access_Token = require("../models/access_token");

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
      // console.log("Error occurred:", err.status);
      res.status(500).send(err);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);
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
      // console.log(passwordCompare);
      if (passwordCompare) {
        const { id: user_id, username: foundedUsername } = user;

        let token = crypto
          .createHash("md5")
          .update(foundedUsername)
          .digest("hex");

        const exTime = new Date();

        await Access_Token.create({
          user_id,
          access_token: token,
          expiry: exTime,
        });
        res.status(200).send({ access_token: token });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An login error occurred" });
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(userId);
      const user = await User.findOne({
        where: {
          id: userId,
        },
        attributes: { exclude: ["password"] },
      });
      const userAddress = await Address.findAll({
        where: {
          user_id: userId,
        },
      });
      res.status(200).send({ user, userAddress });
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
      res.status(200).send({ message: "user deleted succesfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  },

  userList: async (req, res) => {
    try {
      const page = req.params.page;
      const limit = 10;
      const skip = (page - 1) * limit;
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
        limit,
        offset: skip,
      });
      res.status(200).send(users);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  },
  addAddress: async (req, res) => {
    try {
      const { address, city, state, pinCode, phoneNum, type } = req.body;
      const data = req.tokenData;

      await Address.create({
        user_id: data.user_id,
        address,
        city,
        state,
        pinCode,
        phoneNum,
        type,
      });
      res.status(200).send({
        message: "address saved successfully",
      });
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
