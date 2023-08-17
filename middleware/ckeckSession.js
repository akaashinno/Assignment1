const Access_Token = require("../models/access_token");

const checkSession = async (req, res, next) => {
  try {
    const data = await Access_Token.findOne({
      where: {
        user_id: req.params.id,
      },
    });
    const nowTime = new Date();
    const timeDiff = nowTime - data.expiry;
    const timeDiffInMins = timeDiff / (1000 * 60);

    if (timeDiffInMins < 60) {
      //   res.status(200).send({ message: "got it" });
      next();
    } else {
      res.status(200).send({ message: "session expired" });
    }
  } catch (error) {
    res.status(401).send({ error: "use a valid id" });
  }
};

module.exports = checkSession;
