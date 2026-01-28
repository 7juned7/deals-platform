import {connect} from "mongoose"
import dotenv from "dotenv";

dotenv.config();
const DATABASE_URI = process.env.DATABASE_URI;
export default connect(DATABASE_URI).then(()=>console.log("DB IS CONNECTED"))
.catch((err)=>{console.err("DB did not connect")})

