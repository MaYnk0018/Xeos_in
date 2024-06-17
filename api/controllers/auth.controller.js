import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'


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


///google auto
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
