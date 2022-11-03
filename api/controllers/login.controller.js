// /api/user/login (POST)

const loginModel = require("../models/login.model");
const jwt = require("jsonwebtoken");
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "600s" });
}

const login = async (req, res) => {
  try {
    let resp = await loginModel(req.body.email, req.body.password);
    console.log(resp);
    const token = generateAccessToken({ resp });
    res.send({ token: token, name: resp.name });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
module.exports = login;
