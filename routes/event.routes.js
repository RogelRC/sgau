import express from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/event.controller.js';
import { protectedRoute } from '../middlewares/createProtectedRoute.js'
import { isAdmin } from '../middlewares/isAdmin.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/event', protectedRoute, isAdmin, upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file ? req.file.path : null;
        const event = await createEvent(req.body, imagePath);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/event', protectedRoute, isAdmin, async (req, res) => {
    try {
        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/event/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        const event = await getEventById(req.params.id);
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/event/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        const event = await updateEvent(req.params.id, req.body);
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/event/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        await deleteEvent(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;