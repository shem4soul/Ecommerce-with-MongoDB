
const { body } = require("express-validator");

exports.addProductValidation = [
  body("title")
    .isString()
    .isLength({ min: 3 })
    .trim()
    .withMessage("Title must be at least 3 characters long."),
  // body("imageUrl").isURL().withMessage("Please enter a valid URL."),
  body("price").isFloat().withMessage("Price must be a number."),
  body("description")
    .isLength({ min: 5, max: 400 })
    .trim()
    .withMessage("Description must be 5-400 characters long."),
];

exports.editProductValidation = [
  body("title")
    .isString()
    .isLength({ min: 3 })
    .trim()
    .withMessage("Title must be at least 3 characters long."),
  body("price").isFloat().withMessage("Price must be a number."),
  body("description")
    .isLength({ min: 5, max: 400 })
    .trim()
    .withMessage("Description must be 5-400 characters long."),
];
