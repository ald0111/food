const jwt = require("jsonwebtoken");
const checkUser = require("../models/checkUser.model");
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    // console.log(err);

    if (err) return res.sendStatus(403);

    try {
      await checkUser(user.resp.userId, user.resp.role);
    } catch (error) {
      if (error) console.log(error);
      return res.sendStatus(403);

      // res.status(400).send(error);
    }

    req.user = user;
    console.log(user.resp.userId);

    next();
  });
}
module.exports = authenticateToken;
