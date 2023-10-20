// /api/kitchen/acceptOrder

const acceptOrderModel = require("../../models/kitchen/acceptOrder.model");
async function acceptOrder(req, res) {
  try {
    let resp = await acceptOrderModel(req.body.orderId);
    console.log(resp);
    res.status(201).send({ success: "cool" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  // res.send({ name: req.user.resp.name, role: req.user.resp.role });
}
module.exports = { acceptOrder };
