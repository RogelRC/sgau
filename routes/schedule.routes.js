import express from 'express';
import { createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule } from '../controllers/schedule.controller.js';
import { protectedRoute } from '../middlewares/createProtectedRoute.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/schedule', protectedRoute, isAdmin, async (req, res) => {
    try {
        const schedule = await createSchedule(req.body);
        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/schedule', protectedRoute, isAdmin, async (req, res) => {
    try {
        const schedules = await getAllSchedules();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/schedule/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        const schedule = await getScheduleById(req.params.id);
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/schedule/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        const schedule = await updateSchedule(req.params.id, req.body);
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/schedule/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        await deleteSchedule(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
