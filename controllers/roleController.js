const Role = require("../models/roles");
const sequelize = require("../database/db");
module.exports = {
  addRole: async (req, res) => {
    const { name, description } = req.body;
    const createRole = await Role.create({
      name: name,
      description: description,
    });
    createUser.save();
    res.status(200).send({ message: "data saved successfully" });
  },
};
