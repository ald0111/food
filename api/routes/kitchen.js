const { Router } = require("express");
const router = Router();
const authenticateToken = require("../middleware/jwt.middleware");
const { addToMenu } = require("../controllers/kitchen.controller");
const kitchenRole = require("../middleware/kitchen.middleware");
router.put("/addToMenu", authenticateToken, kitchenRole, addToMenu);

module.exports = router;
