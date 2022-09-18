import mongoose from "mongoose";
const { Schema } =mongoose;

const UserSchema = new Schema({
//username
username: {
  type: String,
    require: true,
    unique:true
},
email: {
  type: String,
    require: true,
    unique:true
  },
  country:{
  type: String,
    require:true
},
  img: {
    type:String
},
  city: {
    type: String,
    require:true
},
  phone: {
    type: String,
    required:true
  },
password: {
  type: String,
    require: true,
    unique:true
  },
  isAdmin: {
    type: Boolean,
    default:false
  },
 
}, {timestamps:true});

export default mongoose.model("User", UserSchema);