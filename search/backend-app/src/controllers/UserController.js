import Apperror from "../utils/Apperror.js";
import {
  sendNotFoundResponse,
  sendSuccessResponse,
} from "../utils/responseHelper.js";
import {
  createUser as createUserApi,
  verifyUser,
} from "../services/userService.js";
import { generateToken } from "../utils/jwtHelper.js";

export async function createUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Apperror(`Email and password are required`, 400, "Bad request");
  }
  const createUser = await createUserApi(email, password);

  return sendSuccessResponse(res, createUser);
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Apperror(`Email and password are required`, 400, "Bad request");
  }
  const result = await verifyUser(email, password);
  if (!result) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = generateToken(email);
  return sendSuccessResponse(res, token);
}
