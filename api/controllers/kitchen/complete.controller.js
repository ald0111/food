// /api/kitchen/complete/:token

const completeOrderModel = require("../../models/kitchen/completeOrder.model");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../configs/jwt.config");
async function complete(req, res) {
  const token = req.params.token;

  jwt.verify(token, jwtSecret.secret, async (err, decoded) => {
    if (err) {
      console.error("Error decoding token:", err);
      return res.sendStatus(403);
    }
    console.log("Decoded token:", decoded.orderId);
    try {
      let resp;
      resp = await completeOrderModel(decoded["orderId"]);
      console.log(resp);
      res.status(200).send(resp);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });
  // res.send({ name: req.user.resp.name, role: req.user.resp.role });
}
module.exports = { complete };
