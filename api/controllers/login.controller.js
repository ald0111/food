const loginModel = require("../models/login.model");

const login = async (req, res) => {
  try {
    let resp = await loginModel(req.body.email, req.body.password);
    console.log(resp);
    if (resp === true) {
      res.send("login api works!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "nope" });
  }
};
module.exports = login;
