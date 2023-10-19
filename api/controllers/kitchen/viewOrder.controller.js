// /api/kitchen/viewOrders

const viewOrdersModel = require("../../models/kitchen/viewOrders.model");
async function viewOrders(req, res) {
  try {
    let resp = await viewOrdersModel();
    console.log(res);
    res.status(200).send(resp);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  // res.send({ name: req.user.resp.name, role: req.user.resp.role });
}
module.exports = { viewOrders };
