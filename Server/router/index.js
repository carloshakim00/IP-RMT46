const express = require ("express");
const UserController = require("../Controllers/UserController");
const router = express.Router();


router.post("/register", UserController.addUser)
router.post("/login", UserController.loginUser)

router.use("/public",require("./public"));


router.use("products",require("./products"));















module.exports = router