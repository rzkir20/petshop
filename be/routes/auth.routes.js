const express = require("express");

const { signup } = require("../controllers/auth.controller");

const { validateBody } = require("../middlewares/validate");

const router = express.Router();

router.post(
  "/signup",
  validateBody({
    name: { required: true, minLen: 2 },
    email: { required: true, email: true },
    password: { required: true, minLen: 6 },
    pictures: { required: false },
  }),
  signup,
);

module.exports = router;
