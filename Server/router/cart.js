const express = require("express");
const router = express.Router();
const CartController = require("../Controllers/CartController");

const authentication = require("../middlewares/authentication");

router.use(authentication);

router.get("/", CartController.getAllItems);

router.post("/", CartController.createItems);
router.delete("/:id", CartController.deleteItemById);

module.exports = router