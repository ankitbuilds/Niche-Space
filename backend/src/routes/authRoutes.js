const express = require("express");
const { registerUser,loginUser, getcurrentUser} = require("../controller/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser)
router.get("/me",protect,getcurrentUser)

module.exports = router;