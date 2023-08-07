const express = require("express");
const router = express.Router();
const {
  addRole,
  deleteRole,
  editRole,
  listRole,
  singleRole,
} = require("../controllers/roleController");

router.post("/add", addRole);
router.delete("/delete/:id", deleteRole);
router.put("/edit/:id", editRole);
router.get("/list", listRole);
router.get("/:id", singleRole);

module.exports = router;
