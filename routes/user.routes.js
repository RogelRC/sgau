// user.routes.js
import express from "express";
import { userController } from "../controllers/user.controller.js";
import { protectedRoute } from "../middlewares/createProtectedRoute.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", protectedRoute, isAdmin, userController.createUser);
router.get("/", protectedRoute, isAdmin, userController.getUsers);
router.get("/:username", protectedRoute, isAdmin, userController.getUserByUsername);
router.put("/:username", protectedRoute, isAdmin, userController.updateUser);
router.delete("/:username", protectedRoute, isAdmin, userController.deleteUser);

export default router;
