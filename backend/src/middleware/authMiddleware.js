const jwt = require("jsonwebtoken");

const protect = (req,res,next)=>{
    try{
        const authheader = req.headers.authorization;
        if(!authheader || !authheader.startsWith('Bearer')){
            return res.status(401).json({
                success: false,
                message: "authentication required"
            })
        }

        const token = authheader.spilt(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();


    }catch(error){
        return res.status(500).json({
            success: false,
            message: "error"
        })
    }
}

module.exports = protect;