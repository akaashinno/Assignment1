const User = require("../models/users");
const addresses = require("../models/address");
const sequelize = require("../database/db");
const bcrypt = require("bcrypt");
let crypto = require("crypto");
const Access_Token = require("../models/access_token");

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
        roleId,
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
          roleId,
        });
        res.status(200).send({
          message: "User registered successfully",
          data: createUser,
        });
      } else {
        res.status(500).send("Confirm Password not matched");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
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
      if (passwordCompare) {
        let token = crypto
          .createHash("md5")
          .update(`${username}${password}${process.env.SECRETKEY}`)
          .digest("hex");

        const userExist = Access_Token.findOne({
          where: {
            userId: user.id,
          },
        });
        if (!userExist) {
          const expiryHour = new Date().getHours() + 1;
          const expiryMins = new Date().getMinutes();
          let expiryTime = expiryHour + expiryMins / 100;
          const createToken = await Access_Token.create({
            userId: user.id,
            token: token,
            expiry: expiryTime,
          });
        } else {
          const timing = userExist.expiry;

          const expiryHour = new Date().getHours();
          const expiryMins = new Date().getMinutes();
          let currentTime = expiryHour + expiryMins / 100;

          let timeDiff = timing - currentTime;
          if (timeDiff > 0) {
            return res.status(400).json({ access_token: userExist.token });
          } else {
            let token = crypto
              .createHash("md5")
              .update(`${username}${password}${process.env.SECRETKEY}`)
              .digest("hex");

            const expiryHour = new Date().getHours() + 1;
            const expiryMins = new Date().getMinutes();
            let expiryTime = expiryHour + expiryMins / 100;

            const createToken = await Access_Token.create({
              userId: user.id,
              token: token,
              expiry: expiryTime,
            });
            return res.status(400).json({ access_token: token });
          }
        }
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An login error occurred" });
    }
  },
  // forRough: async (req, res) => {
  //   try {
  //     const expiryHour = new Date().getHours() + 1;
  //     const expiryMins = new Date().getMinutes();
  //     let expiryTime = expiryHour + expiryMins / 100;
  //     await Access_Token.create({
  //       userId: 56,
  //       token: 899,
  //       expiryDate: expiryTime,
  //     });
  //     res.status(200).send({
  //       message: "done successfully",
  //       data: expiryHour,
  //       data1: expiryMins,
  //       data2: expiryTime,
  //     });
  //   } catch (err) {
  //     res.status(500).json({ message: err });
  //   }
  // },
  getUser: async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id);
      const user = await User.findAll({
        attributes: { exclude: ["password"] },
        include: {
          model: addresses,
          as: "addressList",
          attributes: ["address", "city", "state", "phone_no"],
        },
        where: {
          id,
        },
      });
      res.status(200).send({
        message: "User details",
        data: user,
      });
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
      const { address, city, state, pin_code, phone_no, userId } = req.body;
      const addAddress = await addresses.create({
        address,
        city,
        state,
        pin_code,
        phone_no,
        userId,
        // userId: req.body.id,
      });
      res.status(200).send(addAddress);
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  },
  deleteAddress: async (req, res) => {
    try {
      const data = req.body.addressArray;
      for (const addressId of data) {
        const user_address = await addresses.findOne({
          where: {
            id: addressId,
          },
        });
        await user_address.destroy();
      }
      res.status(200).send({
        message: "address deleted successfully",
      });
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  },
  // forgotPassword: (req, res) => {
  //   try {
  //   } catch (error) {}
  // },
  // verifyResetPassword: (req, res) => {
  //   try {
  //   } catch (error) {}
  // },
};
