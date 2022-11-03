const user = async (req, res) => {
  console.log(req.user);
  res.send({ message: "auth content", name: req.user.resp.name });
};
module.exports = user;
