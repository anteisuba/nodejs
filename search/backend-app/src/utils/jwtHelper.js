// import jwt from "jsonwebtoken";
import Apperror from "./Apperror.js";
import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(data) {
  //   const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: "60 * 60" });
  const token = await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("20s")
    .sign(JWT_SECRET);
  return token;
}

export async function verifyToken(token) {
  try {
    // jwt.verify(token, JWT_SECRET);
    await jose.jwtVerify(token, JWT_SECRET);
  } catch (error) {
    throw new Apperror(error.message || "Invalid token", 401, error.name);
  }
}
