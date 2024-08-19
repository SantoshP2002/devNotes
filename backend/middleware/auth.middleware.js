import jwt from "jsonwebtoken";
import { userModel } from "../model/user.model.js";

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ Message: "token not found" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.status(401).send({ Message: "token not found " });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
     return  res.status(401).send({ Message: "Invalid Token please login first" });
    }
    const user = await userModel.findById(decoded.id);
   
    
    if (!user) {
      return res.status(401).send({ Message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ Message: "Invalid Token" });
  }
};

export default auth;
