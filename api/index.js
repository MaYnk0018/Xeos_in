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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use('/api/auth', authRouter);

app.get((err, req, res, next)=>{
  const message=  `server error`;
  const errorCode= err.statusCode;
  res.status(errorCode).json({
    error: "failed",
    message,
    errorCode
  })
})


