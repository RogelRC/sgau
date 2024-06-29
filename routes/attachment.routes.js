import express from 'express';
import { createAttachment, getAllAttachments, getAttachmentById, updateAttachment, deleteAttachment } from '../controllers/attachment.controller.js';
import { protectedRoute } from '../middlewares/createProtectedRoute.js';
import { isTeacher } from '../middlewares/isRole.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/attachment', protectedRoute, isTeacher, upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file ? req.file.path : null;
        const attachment = await createAttachment({ ...req.body, file_path: filePath });
        res.status(201).json(attachment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/attachment', protectedRoute, async (req, res) => {
    try {
        const attachments = await getAllAttachments();
        res.status(200).json(attachments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/attachment/:id', protectedRoute, async (req, res) => {
    try {
        const attachment = await getAttachmentById(req.params.id);
        res.status(200).json(attachment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/attachment/:id', protectedRoute, isTeacher, async (req, res) => {
    try {
        const attachment = await updateAttachment(req.params.id, req.body);
        res.status(200).json(attachment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/attachment/:id', protectedRoute, isTeacher, async (req, res) => {
    try {
        await deleteAttachment(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
