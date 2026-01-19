import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30d", // Token valid for 30 days
  });

  res.cookie("jwt", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true, // Accessible only by web server
    secure: process.env.NODE_ENV === "development" ? false : true, // Set to true in production
    sameSite: "Strict", // CSRF protection
  });

  return token;
};
