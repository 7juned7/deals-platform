import { Schema,Types,model } from "mongoose";

const USERSCHEMA = new Schema(
    {
      name:{type:String,required:true},
      email:{type:String,required:true,unique:true},
      password:{
        type:String,
        required:true
      },
      isVerified:{
        type:Boolean,
        default:false
      },
    },
    {timestamps:true}
);

const User = model("User",USERSCHEMA)
export default User