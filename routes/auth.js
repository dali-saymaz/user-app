const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

//Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Logout
router.get("/logout", authController.logout);

// CheckLogin
router.get("/checkLogin", authController.checkLogin);

module.exports = router;
