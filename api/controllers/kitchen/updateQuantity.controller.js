// /api/kitchen/menu

const updateQuantityModel = require("../../models/kitchen/updateQuantity.model");
async function updateQuantity(req, res) {
  try {
    let resp = await updateQuantityModel(req.body.foodName, req.body.quantity);
    console.log(resp);
    res.status(201).send({ success: "cool" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  // res.send({ name: req.user.resp.name, role: req.user.resp.role });
}
module.exports = { updateQuantity };
