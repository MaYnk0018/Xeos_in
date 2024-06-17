
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
      type: String,
      default:'https://i.pinimg.com/564x/54/72/d1/5472d1b09d3d724228109d381d617326.jpg'
  }
  
},{ timestamps: true });

const User= mongoose.model('User', UserSchema);
export default User;
