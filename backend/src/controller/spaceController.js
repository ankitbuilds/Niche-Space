const Space = require("../models/Space");

const createSpace = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      images,
      amenities,
      pricePerhour,
      capacity,
      openingtime,
      closingtime,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !pricePerhour ||
      !capacity ||
      !openingtime ||
      !closingtime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const space = await Space.create({
      host: req.user.userId,
      title,
      description,
      category,
      location,
      images,
      amenities,
      pricePerhour,
      capacity,
      openingtime,
      closingtime,
    });

    res.status(201).json({
      success: true,
      message: "Space created successfully",
      space,
    });
  } catch (error) {
    console.error("Create space error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createSpace,
};
