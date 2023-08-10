const express = require("express");
const router = express.Router();

const fetchUser = require("../middleware/fetchUser");
const {
  addUser,
  login,
  getUser,
  deleteUser,
  userList,
} = require("../controllers/userController");

router.post("/add", addUser);
router.post("/login", login);
router.get("/get", fetchUser, getUser);
router.delete("/delete", fetchUser, deleteUser);
router.get("/list/:page", userList);

module.exports = router;
