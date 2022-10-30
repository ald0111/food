const { Router } = require("express");
const router = Router();

let counter = 0;

router.get("/", (req, res) => {
  res.send("guess this works");
  counter = counter + 1;
  console.log(counter);
});

router.get("/test", (req, res) => {
  res.send("test works");
  counter = counter + 1;
  console.log(counter);
});

router.post("/post", (req, res) => {
  res.send("post works");
  counter = counter + 1;
  console.log(counter);
  console.log(req.query);
});

module.exports = router;
// app.listen(port, () => console.log(`Listening on port ${port}`));
