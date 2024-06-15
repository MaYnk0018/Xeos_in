import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./Routes/auth.route.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`MongoDB connected successfully`);
  })
  .catch((e) => {
    console.log(`error ${e}`);
  });

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
