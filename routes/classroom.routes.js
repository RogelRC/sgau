import express from 'express';
import { createclassroom, getAllclassrooms, getclassroomById, updateclassroom, deleteclassroom } from '../controllers/classroom.controller.js';
import { protectedRoute } from '../middlewares/createProtectedRoute.js'
import { isAdmin } from '../middlewares/isRole.js';

const router = express.Router();

router.post('/classroom',  async (req, res) => {
    try {
        const classroom = await createclassroom(req.body);
        res.status(201).json(classroom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/classroom', async (req, res) => {
    try {
        const classrooms = await getAllclassrooms();
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/classroom/:id', async (req, res) => {
    try {
        const classroom = await getclassroomById(req.params.id);
        res.status(200).json(classroom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/classroom/:id', async (req, res) => {
    try {
        const classroom = await updateclassroom(req.params.id, req.body);
        res.status(200).json(classroom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/classroom/:id', async (req, res) => {
    try {
        await deleteclassroom(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;