const express = require("express");
const router = express.Router();

const fetchUser = require("../middleware/fetchUser");
const checkSession = require("../middleware/ckeckSession");
const verifyToken = require("../middleware/verifyToken");
const {
  addUser,
  login,
  getUser,
  deleteUser,
  userList,
  addAddress,
  deleteAddress,
  forgotPassword,
} = require("../controllers/userController");

router.post("/add", addUser);
router.post("/login", login);
// router.get("/get", fetchUser, getUser);
router.get("/get/:id", checkSession, getUser);
router.delete("/delete", fetchUser, deleteUser);
router.get("/list/:page", userList);
router.post("/address", verifyToken, addAddress);
router.delete("/delete_address/:id", checkSession, deleteAddress);
// router.post("/forgot-password", forgotPassword);
// router.post(
//   "/verify-reset-password/:password-reset-token",
//   verifyResetPassword
// );

module.exports = router;
