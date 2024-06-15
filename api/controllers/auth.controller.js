import User from "../models/user.model.js";

export const signUp = async (req, res) => {
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
  }
};
