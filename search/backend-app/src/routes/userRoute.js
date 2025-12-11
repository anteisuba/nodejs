import express from "express";
import { createUser, login } from "../controllers/UserController.js";

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(login);
router.route("/login/get").get((req, res) => {
  res.json({
    message: "Signup endpoint OK (GET)",
  });
});

export default router;
