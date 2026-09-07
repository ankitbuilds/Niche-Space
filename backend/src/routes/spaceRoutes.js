const express = require("express");

const {createSpace,} = require("../controller/spaceController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createSpace);

module.exports = router;