import { eventModel } from "../models/event.model.js";

export const createEvent = async (req, res) => {
    const { name, date, time, location, description } = req.body;
    const image = req.file; // Assuming image is uploaded as a file

    try {
        const event = await eventModel.createEvent(name, date, time, location, description, image);
        res.status(201).json(event);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, date, time, location, description } = req.body;
    const image = req.file; // Assuming image is uploaded as a file

    try {
        const event = await eventModel.updateEvent(id, name, date, time, location, description, image);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        await eventModel.deleteEvent(id);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await eventModel.getEvents();
        res.json(events);
    } catch (error) {
        console.error("Error getting events:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await eventModel.getEventById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        console.error("Error getting event by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const eventController = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEventById,
};
