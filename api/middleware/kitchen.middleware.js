function kitchenRole(req, res, next) {
  req.user.resp.role === "kitchen" ? next() : res.sendStatus(403);
}
module.exports = kitchenRole;
