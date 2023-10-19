const { Router } = require("express");
const router = Router();

//Middlewares
const authenticateToken = require("../middleware/jwt.middleware");
const kitchenRole = require("../middleware/kitchen.middleware");

//Controllers
const { addToMenu } = require("../controllers/kitchen/addMenu.controller");
const { getMenu } = require("../controllers/kitchen/menu.controller");
const {
  updateQuantity,
} = require("../controllers/kitchen/updateQuantity.controller");
const { placeOrder } = require("../controllers/kitchen/placeOrder.controller");
const { viewOrders } = require("../controllers/kitchen/viewOrder.controller");

//Routes
router.put("/addToMenu", authenticateToken, kitchenRole, addToMenu);
router.get("/menu", authenticateToken, getMenu);
router.put("/updateQuantity", authenticateToken, kitchenRole, updateQuantity);
router.post("/placeOrder", authenticateToken, placeOrder);
router.get("/viewOrders", authenticateToken, kitchenRole, viewOrders);

module.exports = router;
