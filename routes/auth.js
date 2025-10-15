const express = require("express");
const authController = require("../controllers/auth");
// Import validation middlewares from separate file
const {
  loginValidation,
  signupValidation,
} = require("../validators/authValidator");

const router = express.Router();

// Authentication routes
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);

router.post("/login", loginValidation, authController.postLogin);
router.post("/signup", signupValidation, authController.postSignup);

router.post("/logout", authController.postLogout);

// Password reset routes
router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
