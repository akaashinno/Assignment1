const Access_Token = require("../models/access_token");

const verifyToken = async (req, res, next) => {
  try {
    // console.log("hello");
    const token = req.headers.access_token;
    // console.log(token);
    if (!token) {
      res.status(401).send({ error: "Incorrect token" });
    }
    const data = await Access_Token.findOne({
      where: {
        access_token: token,
      },
    });
    // console.log("found data");
    const nowTime = new Date();
    const timeDiff = nowTime - data.expiry;
    const timeDiffInMins = timeDiff / (1000 * 60);

    if (timeDiffInMins < 60) {
      req.tokenData = data;
      next();
    }
    // if (timeDiffInMins > 60) {
    //   res.status(200).send({ message: "time is more than 60 mins" });
    // }
  } catch (error) {
    res.status(401).send({ error: "use a valid token" });
  }
};

module.exports = verifyToken;
