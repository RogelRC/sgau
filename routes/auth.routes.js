// auth.routes.js
import express from "express";
import { loginUser, logoutUser } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/createProtectedRoute.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", protectedRoute, logoutUser);

export default router;
