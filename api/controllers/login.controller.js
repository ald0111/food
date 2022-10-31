const register = require("../models/register.model");

const login = async (req, res) => {
  let resp;
  if (
    req.body.email &&
    req.body.name &&
    req.body.phonenumber &&
    req.body.password
  ) {
    resp = register(
      req.body.email,
      req.body.name,
      req.body.phonenumber,
      req.body.password
    );
  }
  console.log(req.body);
  res.send("cool");
  await resp;
  if (resp) console.log();
};

module.exports = login;
