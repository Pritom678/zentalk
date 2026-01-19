import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {

  const{JWT_SECRET}=ENV;
  if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId: userId }, ENV.JWT_SECRET, {
    expiresIn: "30d", // Token valid for 30 days
  });

  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true, // Accessible only by web server
    secure: ENV.NODE_ENV === "development" ? false : true, // Set to true in production
    sameSite: "Strict", // CSRF protection
  });

  return token;
};
