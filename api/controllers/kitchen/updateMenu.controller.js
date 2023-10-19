// /api/kitchen/menu

const fetchMenuModel = require("../../models/kitchen/getFoods.model");
async function getMenu(req, res) {
  let errors = {};
  try {
    let resp = await fetchMenuModel();
    console.log(res);
    res.status(200).send(resp);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
  // res.send({ name: req.user.resp.name, role: req.user.resp.role });
}
module.exports = { getMenu };
