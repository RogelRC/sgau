import Attachment from '../models/attachment.model.js';

export const createAttachment = async (attachmentData) => {
    try {
        const attachment = await Attachment.create(attachmentData);
        return attachment;
    } catch (error) {
        throw new Error(`Error creating attachment: ${error.message}`);
    }
};

export const getAllAttachments = async () => {
    try {
        const attachments = await Attachment.findAll();
        return attachments;
    } catch (error) {
        throw new Error(`Error fetching attachments: ${error.message}`);
    }
};

export const getAttachmentById = async (attachmentId) => {
    try {
        const attachment = await Attachment.findByPk(attachmentId);
        if (!attachment) throw new Error('Attachment not found');
        return attachment;
    } catch (error) {
        throw new Error(`Error fetching attachment: ${error.message}`);
    }
};

export const updateAttachment = async (attachmentId, updateData) => {
    try {
        const attachment = await Attachment.findByPk(attachmentId);
        if (!attachment) throw new Error('Attachment not found');
        
        await attachment.update(updateData);
        return attachment;
    } catch (error) {
        throw new Error(`Error updating attachment: ${error.message}`);
    }
};

export const deleteAttachment = async (attachmentId) => {
    try {
        const attachment = await Attachment.findByPk(attachmentId);
        if (!attachment) throw new Error('Attachment not found');
        
        await attachment.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting attachment: ${error.message}`);
    }
};
