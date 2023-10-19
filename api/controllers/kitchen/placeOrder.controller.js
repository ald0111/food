// /api/kitchen/placeOrder

const placeOrderModel = require("../../models/kitchen/placeOrder.model");
async function placeOrder(req, res) {
  try {
    let orderJSON = JSON.stringify(req.body.order);
    console.log(orderJSON);
    let resp = await placeOrderModel(orderJSON, req.user.resp.userId);
    console.log(resp);
    res.status(201).send({ success: "order placed" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  // res.send({ name: req.user.resp.name, role: req.user.resp.role });
}
module.exports = { placeOrder };
