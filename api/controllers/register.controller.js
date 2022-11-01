const registerModel = require("../models/register.model");
const emailModel = require("../models/email.model");
const phonenumberModel = require("../models/phonenumber.model");

const register = async (req, res) => {
  //checks for availability
  let errors = {};
  try {
    await emailModel(req.body.email);
  } catch (error) {
    errors = { ...errors, ...error };
    // res.status(400).send(error);
  }
  try {
    await phonenumberModel(req.body.phonenumber);
  } catch (error) {
    errors = { ...errors, ...error };
  }
  if (Object.keys(errors).length > 0) {
    console.log(errors);
    res.status(400).send(errors);
    return;
  }
  try {
    await registerModel(
      req.body.email,
      req.body.name,
      req.body.phonenumber,
      req.body.password
    );
    console.log(req.body);
    res.send("cool");
  } catch (error) {
    res.status(400).send({ error: "Registration failed" });
  }
  //validates and registers
};

module.exports = register;
