const express = require("express");

const {createSpace, getallSpaces, getSpaceById, updateSpace, deleteSpace, getMySpaces,} = require("../controller/spaceController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createSpace);
router.get("/", getallSpaces);
router.get("/host/my-spaces", protect, getMySpaces);
router.get("/:id",getSpaceById);
router.put('/:id',protect,updateSpace);
router.delete('/:id', protect, deleteSpace);



module.exports = router;