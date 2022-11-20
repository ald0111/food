async function addToMenu(req, res) {
  res.send({ name: req.user.resp.name, role: req.user.resp.role });
}
module.exports = { addToMenu };
