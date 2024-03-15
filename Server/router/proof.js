const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();


const authentication = require("../middlewares/authentication");

const ProofController = require("../Controllers/ProofController");

router.use(authentication)

router.post("/", upload.single("image"), ProofController.createProof);

module.exports = router
