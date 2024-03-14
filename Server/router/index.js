const express = require ("express");
const UserController = require("../Controllers/UserController");
const router = express.Router();


router.post("/register", UserController.addUser)
router.post("/login", UserController.loginUser)
router.post("/google-login", UserController.googleLogin)

router.use("/public",require("./public"));

router.use("/products",require("./products"));

router.use("/cart",require("./cart"));

router.use("/proof",require("./proof"));















module.exports = router