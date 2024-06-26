import express from 'express';
import { createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject } from '../controllers/subject.controller.js';
import { protectedRoute } from '../middlewares/createProtectedRoute.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/subject', protectedRoute, isAdmin, async (req, res) => {
    try {
        const subject = await createSubject(req.body);
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/subject', protectedRoute, isAdmin, async (req, res) => {
    try {
        const subjects = await getAllSubjects();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/subject/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        const subject = await getSubjectById(req.params.id);
        res.status(200).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/subject/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        const subject = await updateSubject(req.params.id, req.body);
        res.status(200).json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/subject/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        await deleteSubject(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
