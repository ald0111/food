const { Router } = require("express");
const router = Router();
const login = require("../controllers/login.controller");
const register = require("../controllers/register.controller");
const { route } = require("./test");
const authenticateToken = require("../middleware/jwt.middleware");
const user = require("../controllers/user.controller");

router.get("/", authenticateToken, user);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
