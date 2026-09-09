const Space = require("../models/Space");
const { findById } = require("../models/User");

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



const getallSpaces = async (req,res)=>{
  try{
    const spaces = await Space.find({
      isActive: true,
    })
    .populate("host", "name email")
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: spaces.length,
      spaces,
    });


  }catch(error){
    res.status(500).json({
      success: false,
      message: "server error"
    })
  }
}


const getSpaceById = async(req,res)=>{
  try{
    const {id} = req.params;

    const space = await Space.findById(id)
      .populate("host", "name email")

    if(!space){
      return res.status(404).json({
        success: false,
        message: "space not found"
      })
    }
    res.status(200).json({
      success: true,
      space,
    })
    


  }catch(error){
    res.status(500).json({
      success: false,
      message: "server error"
    })
  }
}


const updateSpace = async(req,res)=>{
  try{
    const {id} = req.params;
    const space = await findById(id);
    if(!space){
      return res.status(404).json({
        success: false,
        message: "space not found"
      })
    }

    if(space.host.toString()!== req.user.userId){
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this space"
      })
    }

    const updatedSpace = await Space.findByIdAndUpdate(
      id,
      req.body,
      {
        new:true,
        runvalidators: true,
      }
    );
    return res.stauts(200).json({
      success: true,
      message:"space updated successfully",
      space: updatedSpace,
    })


  }catch(error){
    return res.status(500).json({
      success: false,
      message:"server error"
    })
  }
}



const deleteSpace = async(req,res)=>{
  try{
    const {id} = req.params;
    const space = await findById(id);

    if(!space){
      return res.status(404).json({
        success: false,
        message: "space not found"
      })
    }

    if(space.host.toString()!== req.user.userId){
      return res.status(403).json({
        success: false,
        message:"You are not allwed to delete this space"
      })
    }

    await Space.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "space deleted successfully"
    })
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "server error"
    })
  }
}


const getMySpaces = async(req,res)=>{
  try{
    const spaces = await Space.find({
      host : req.user.userId
    }).sort({ceatedAt: -1});

    return res.status(200).json({
      success: true,
      count: spaces.length,
      spaces,
    })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: "server error"
    })
  }
}

module.exports = {
  createSpace,getallSpaces,getSpaceById, updateSpace, deleteSpace,
  getMySpaces
};
