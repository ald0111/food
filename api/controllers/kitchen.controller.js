// /api/kitchen/addToMenu

const addMenuModel = require("../models/addMenu.model");
const foodNameModel = require("../models/foodName.models");
async function addToMenu(req, res) {
  let errors = {};
  if (!(req.body.foodName && req.body.cost)) {
    errors.error = "Mandatory fields are required.";
  }
  try {
    await foodNameModel(req.body.foodName);
  } catch (error) {
    errors = { ...errors, ...error };
    // res.status(400).send(error);
  }
  if (Object.keys(errors).length > 0) {
    console.log(errors);
    res.status(400).send(errors);
    return;
  }
  try {
    await addMenuModel(req.body.foodName, req.body.cost);
    console.log(req.body);
    res.status(201).send({ success: "cool" });
  } catch (error) {
    res.status(400).send(error);
  }
  // res.send({ name: req.user.resp.name, role: req.user.resp.role });
}
module.exports = { addToMenu };
