const express = require("express");
const router = express.Router();
const { addRole } = require("../controllers/roleController");

router.post("/add", addRole);

module.exports = router;
