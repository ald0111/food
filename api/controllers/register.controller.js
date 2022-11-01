const registerModel = require("../models/register.model");
const emailModel = require("../models/email.model");
const phonenumberModel = require("../models/phonenumber.model");

const register = async (req, res) => {
  //checks for availability
  try {
    await emailModel(req.body.email);
    try {
      await phonenumberModel(req.body.phonenumber);
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
        res.status(400).send("Registration failed");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(400).send(error);
  }
  //validates and registers
};

module.exports = register;
