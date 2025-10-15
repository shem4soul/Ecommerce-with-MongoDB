const { check, body } = require("express-validator");

exports.signupValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail()
    .custom((value) => {
      if (value === "test@test.com") {
        throw new Error("This email address is forbidden.");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
    .withMessage(
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .trim(),

  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match!");
      }
      return true;
    }),
];

exports.loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("password", "Invalid password.")
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
    .trim(),
];
