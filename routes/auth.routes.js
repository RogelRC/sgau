import express from 'express';
import { authenticateUser, deleteToken } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middlewares/createProtectedRoute.js';

const router = express.Router();

// Ruta para autenticar usuario
router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await authenticateUser(username, password);
        res.status(200).json(token);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/auth/logout', protectedRoute, async (req, res) => {
    try{
        const token = await deleteToken(req.headers.authorization.split(" ")[1]);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
