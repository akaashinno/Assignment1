const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./database/db");
const role = require("./models/roles");

role.sync();
const router = require("./routes/route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/role", router);
const port = 5000;
app.listen(port);
console.log(`Server running at http://localhost : ${port}`);
