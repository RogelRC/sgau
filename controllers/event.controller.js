import Event from '../models/event.model.js';

export const createEvent = async (eventData, imagePath) => {
    try {
        eventData.image_path = imagePath;
        const event = await Event.create(eventData);
        return event;
    } catch (error) {
        throw new Error(`Error creating event: ${error.message}`);
    }
};

export const getAllEvents = async () => {
    try {
        const events = await Event.findAll();
        return events;
    } catch (error) {
        throw new Error(`Error fetching events: ${error.message}`);
    }
};

export const getEventById = async (eventId) => {
    try {
        const event = await event.findByPk(eventId);
        if (!event) throw new Error('Event not found');
        return event;
    } catch (error) {
        throw new Error(`Error fetching event: ${error.message}`);
    }
};

export const updateEvent = async (eventId, updateData, imagePath) => {
    try {
        const event = await Event.findByPk(eventId);
        if (!event) throw new Error('Event not found');
        
        updateData.image_path = imagePath;
        await event.update(updateData);
        return event;
    } catch (error) {
        throw new Error(`Error updating event: ${error.message}`);
    }
};

export const deleteEvent = async (eventId) => {
    try {
        const event = await Event.findByPk(eventId);
        if (!event) throw new Error('Event not found');
        
        await event.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting event: ${error.message}`);
    }
};