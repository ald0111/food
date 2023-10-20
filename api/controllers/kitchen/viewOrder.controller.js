// /api/kitchen/viewOrders

const viewOrdersModel = require("../../models/kitchen/viewOrders.model");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../configs/jwt.config");
async function viewOrders(req, res) {
  try {
    let resp;
    let tokens = [];
    if (req.user.resp.role !== "kitchen") {
      resp = await viewOrdersModel(req.user.resp.userId, undefined);
      resp.map((order, i) => {
        console.log(order.id);
        tokens.push(jwt.sign({ orderId: order.id }, jwtSecret.secret));
        console.log(resp[i]);
      });
      console.log(tokens);
      res.status(200).send(tokens);
    } else {
      resp = await viewOrdersModel(undefined, undefined);
      console.log(resp);
      res.status(200).send(resp);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  // res.send({ name: req.user.resp.name, role: req.user.resp.role });
}
module.exports = { viewOrders };
