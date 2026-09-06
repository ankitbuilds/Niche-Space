const express = require("express");
const { registerUser,loginUser, getcurrentUser} = require("../controller/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser)
router.get("/me",getcurrentUser)

module.exports = router;