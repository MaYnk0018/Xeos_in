import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";



export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password,
  });

  //entery checkup using Zod.js later in part
  try {
    await newUser.save();
    res.json(`User created successfully`);
  } catch (e) {
    res.status(500).json(`User not created`);
    console.log(e);
    next(e);
  }
};

//signIN Controller
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validateUser = await User.findOne( {email} );
    if (!validateUser) {
      return next(errorHandler(404, "User not found"));
    }
    if (password !== validateUser.password) {
      return next(errorHandler(404, "User not found"));
    }
    const {password: passwo, ...remain} = validateUser._doc;
    const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .cookie("Token", token, {
        httpOnly: true,
      })
      .json(remain);
  } catch (e) {
    next(e);
  }
};
