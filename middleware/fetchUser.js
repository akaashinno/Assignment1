const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Incorrect token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWTSECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "use a valid token" });
  }
};

module.exports = fetchUser;
