const { Router } = require("express");
const router = Router();

const test = require("./routes/test");
const user = require("./routes/user");
const kitchen = require("./routes/kitchen");

router.use("/test", test);
router.use("/user", user);
router.use("/kitchen", kitchen);

module.exports = router;
