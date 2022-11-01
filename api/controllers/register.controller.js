const registerModel = require("../models/register.model");

const register = async (req, res) => {
  let resp = registerModel(
    req.body.email,
    req.body.name,
    req.body.phonenumber,
    req.body.password
  );

  console.log(req.body);

  if (await resp) {
    res.send("cool");
  } else {
    res.status(400);
    res.send("Registration failed");
  }
};

module.exports = register;
