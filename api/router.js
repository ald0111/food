const { Router } = require("express");
const router = Router();

const test = require("./routes/test");
const user = require("./routes/user");

router.use("/test", test);
router.use("/user", user);

module.exports = router;
