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
      console.log("Error occurred:", err.status);
      res.status(500).send({ message: "Internal server error" });
    }
  },
  deleteRole: async (req, res) => {
    try {
      const role = await Role.findByPk(req.params.id);
      await role.destroy();
      res.status(200).send({ message: "role deleted succesfully" });
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  },
  editRole: async (req, res) => {
    // console.log("Hello world");
    try {
      const { name, description } = req.body;
      await Role.update(
        { name: name, description: description },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send({ message: "Role updated successfully" });
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  },
  listRole: async (req, res) => {
    try {
      const list = await Role.findAll();
      res.status(200).send(list.map((item) => item));
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  },
  singleRole: async (req, res) => {
    try {
      const role = await Role.findByPk(req.params.id);
      res.status(200).send(role);
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).send({ message: "Internal server error" });
    }
  },
};
