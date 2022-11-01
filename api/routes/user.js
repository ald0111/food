const { Router } = require("express");
const router = Router();
const login = require("../controllers/login.controller");
const register = require("../controllers/register.controller");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
