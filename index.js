const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./database/db");

const roles = require("./models/roles");
const users = require("./models/users");
const access_token = require("./models/access_token");
const address = require("./models/address");

const roleRouter = require("./routes/route");
const userRouter = require("./routes/userRoute");

require("dotenv").config();

sequelize.sync({ models: [roles, users, access_token, address] });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/role", roleRouter);

app.use("/user", userRouter);

const port = 5000;
app.listen(port, () =>
  console.log(`Server running at http://localhost : ${port}`)
);
