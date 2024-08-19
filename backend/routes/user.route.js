import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

// REGISTER
userRouter.post("/register", async (req, res) => {
  const { name, email, password, age, gender } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        return res
          .status(500)
          .json({ message: "error occured during hashing of password" });
      }
      const user = new userModel({
        name,
        email,
        password: hash,
        age,
        gender,
      });
      await user.save();
      res.status(201).json({ message: "user registered successfully" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// LOGIN
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await userModel.findOne({email});
    
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    // Compare the password using bcrypt
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res
            .status(500) 
            .json({ message: "error occured during hashing of password" });
        }

        
        if (result) {
           // Generate a JWT token
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
          return res
            .status(201)
            .json({ message: "user logged in successfully", token });
        } else {
          res.status(400).json({ message: "Wrong Password" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default userRouter;
