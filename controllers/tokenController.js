const User = require("../models/users");
const sequelize = require("../database/db");
let crypto = require("crypto");
const Access_Token = require("../models/access_token");

module.exports = {
  createToken: async (req, res) => {
    try {
      const { username } = req.body;
      const found = await User.findOne({
        where: {
          username,
        },
      });
      if (!found) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const user_id = found.id;

      const foundedUsername = found.username;
      let token = crypto
        .createHash("md5")
        .update(foundedUsername)
        .digest("hex");

      const expiryTime = new Date();
      const exTime = expiryTime.setHours(expiryTime.getHours() + 1);

      await Access_Token.create({
        user_id,
        access_token: token,
        expiry: exTime,
      });
      res.status(200).send("token saved successfully");
    } catch (error) {
      res.status(500).send("error");
    }
  },
};
