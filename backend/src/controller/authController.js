const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async(req,res)=>{
    try{
        const {name, email, password} = req.body;
        if(!name||!email||!password){
            return res.status(400).json({
                success: false,
                message: "name, email and password is required"
            })
        };

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
            success: false,
            message: "user already exist"
            })
        }

          // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });
        

    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}


const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({
                success: false,
                message: "email and password are required"

            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        
        // check password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )
        if(!isPasswordCorrect){
            return res.status(401).json({
                success: false,
                message: "email or password is wrong"
            })
        }


        // jwt token
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            token,
            user:{
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role

            }
        });
    }catch(error){
        console.error("Login Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

const getcurrentUser = async(req,res)=>{
    try{
        const user = await User.findById(req.user.userId).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }
        return res.status(200).json({
            success: true,
            user,
        })

    }
    catch(error){
        console.error("getCurrentUser Error:", error);
        return res.status(500).json({
            success: false,
            message: "server error",
        })

    }
}

module.exports = { registerUser,loginUser, getcurrentUser}

