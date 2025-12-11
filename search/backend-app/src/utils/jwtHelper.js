import jwt from "jsonwebtoken";
import Apperror from "./Apperror.js";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(data) {
  const token = jwt.sign({ data }, JWT_SECRET);
  return token;
}

export function verifyToken(token) {
  try {
    jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Apperror(error.message || "Invalid token", 401, error.name);
  }
}
