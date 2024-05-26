import express from "express";
import { eventController } from "../controllers/event.controller.js";
import { protectedRoute } from "../middlewares/createProtectedRoute.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Rutas para eventos
router.post("/", protectedRoute, isAdmin, upload.single("image"), eventController.createEvent);
router.put("/:id", protectedRoute, isAdmin, upload.single("image"), eventController.updateEvent);
router.delete("/:id", protectedRoute, isAdmin, eventController.deleteEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);

export default router;
