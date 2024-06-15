import User from "../models/user.model.js";
//import errorHandler from "../utils/error.js"

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
    next(e)
    console.log(e);
  }
};
