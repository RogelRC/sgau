import express from 'express';
import { getAllTurns, getTurnById, updateTurn, deleteTurn, createOrUpdateTurn } from '../controllers/turn.controller.js';
import { protectedRoute } from '../middlewares/createProtectedRoute.js';
import { isAdmin } from '../middlewares/isRole.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/turn', protectedRoute, isAdmin, upload.single('file'), async (req, res) => {
    try {
        const turn = await createOrUpdateTurn(req.body);
        res.status(201).json(turn);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/turn/:schedule_id', protectedRoute, isAdmin, async (req, res) => {
    try {
        const turns = await getAllTurns(req.params);
        res.status(200).json(turns);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/turn/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        const turn = await updateTurn(req.params.id, req.body);
        res.status(200).json(turn);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/turn/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        await deleteTurn(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
