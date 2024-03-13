const express = require ("express");
const UserController = require("../Controllers/UserController");
const router = express.Router();


router.post("/register", UserController.addUser)
router.post("/login", UserController.loginUser)

router.use("/public",require("./public"));


router.use("product",require("./product"));















module.exports = router