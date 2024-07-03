import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, getTeachers } from '../controllers/user.controller.js';
import { protectedRoute } from '../middlewares/createProtectedRoute.js'
import { isAdmin } from '../middlewares/isRole.js';

const router = express.Router();

router.post('/user', protectedRoute, isAdmin,  async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/user', protectedRoute, isAdmin, async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/user/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/user/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/user/:id', protectedRoute, isAdmin, async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/teachers', protectedRoute, isAdmin, async (req, res) => {
    try {
        const users = await getTeachers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;