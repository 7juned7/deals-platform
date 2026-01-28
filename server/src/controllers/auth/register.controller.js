import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../../modals/user/user.modal.js";

export async function handleRegister(req,res){
    try {
        const {email,password,name}= req.body
        if(!email || !password || !name ){
            return res.status(400).json({message:"please enter all fields"})
        }
        const jwtSecret = process.env.JWT_SECRET_KEY;
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message:"user already regesterd"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            isVerified:false
        })
        await newUser.save();
        const verificationToken = jwt.sign(
{id:newUser._id,email},
jwtSecret,
{expiresIn:"1d"}
            
        )
        res.status(201).json({message:"user created successfully",
            token:verificationToken,
            user:{
                _id : newUser._id,
               name:newUser.name,
                email:newUser.email,
                isVerified:newUser.isVerified,
                
            }
        })
    } catch (error) {
        console.error("error in creating user",error);
        res.status(500).json({message:"error in creating user",})
    }
}