const { Router } = require("express");
const router = Router();

//Middlewares
const authenticateToken = require("../middleware/jwt.middleware");
const kitchenRole = require("../middleware/kitchen.middleware");

//Controllers
const { addToMenu } = require("../controllers/kitchen/addMenu.controller");
const menu = require("../controllers/kitchen/menu.controller");

//Routes
router.put("/addToMenu", authenticateToken, kitchenRole, addToMenu);
router.get("/menu", authenticateToken, kitchenRole, menu);

module.exports = router;
