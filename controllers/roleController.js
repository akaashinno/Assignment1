const Role = require("../models/roles");
const sequelize = require("../database/db");

module.exports = {
  addRole: async (req, res) => {
    try {
      const { name, description } = req.body;
      const createRole = await Role.create({
        name: name,
        description: description,
      });
      // throw err;
      createRole.save();
      res.status(200).send({ message: "data saved successfully" });
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
