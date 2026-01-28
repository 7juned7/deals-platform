import { Schema,model } from "mongoose";

const ClaimSchema = new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        deal:{
            type:Schema.Types.ObjectId,
            ref:"Deal",
            required:true
        },
         status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending"
    }
    },
    {timestamps:true}
);

ClaimSchema.index({user:1,deal:1},{unique:true});
const Claim = model("Claim",ClaimSchema);
export default Claim;