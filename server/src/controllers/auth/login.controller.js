import User from "../../modals/user/user.modal.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt" 
export default async function  handleLogin(req,res){
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"email and password are required"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"email or password are required"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"wrong password"});
        }
        const jwtSecret = process.env.JWT_SECRET_KEY
const token = jwt.sign(
    {id:user._id,email:user.email,isVerified:user.isVerified},
    jwtSecret,
    {expiresIn:"1d"}
)
return res.status(200).json({
    message:"login successfull",
    token,
    user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        isVerified:user.isVerified
    }
})
    } catch (error) {
        console.error("error in login",error);
        res.status(500).json({message:"error in login"})
    }
}