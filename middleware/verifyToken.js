const Access_Token = require("../models/access_token");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.access_token;

    if (!token) {
      res.status(401).send({ error: "Incorrect token" });
    }
    const findToken = await Access_Token.findOne({
      where: {
        token: token,
      },
    });

    if (findToken && findToken.token === token) {
      const timing = findToken.expiry;

      const expiryHour = new Date().getHours();
      const expiryMins = new Date().getMinutes();
      let currentTime = expiryHour + expiryMins / 100;

      let timeDiff = timing - currentTime;

      if (timeDiff > 0) {
        req.body = { ...req.body, id: findToken.userId };
        next();
      } else {
        res.status(401).send({ message: "Sorry Session is expired" });
      }
    }
  } catch (error) {
    res.status(401).send({ error: "use a valid token" });
  }
};

module.exports = verifyToken;
