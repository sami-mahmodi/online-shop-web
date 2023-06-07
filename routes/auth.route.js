const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
router.get("/signup", authController.getSignup);
router.post("/signup", authController.signup);
router.get("/signup", authController.getLogin);
module.exports = router;
