import { pool } from "../database/connection.js";

const createEvent = async (name, date, time, location, description, image) => {
    try {
        const insertEventQuery = `
            INSERT INTO "events" (name, date, time, location, description, image)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `;
        const result = await pool.query(insertEventQuery, [name, date, time, location, description, image]);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

const updateEvent = async (id, name, date, time, location, description, image) => {
    try {
        const updateEventQuery = `
            UPDATE "events"
            SET name = $1, date = $2, time = $3, location = $4, description = $5, image = $6
            WHERE id = $7
            RETURNING *
        `;
        const result = await pool.query(updateEventQuery, [name, date, time, location, description, image, id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

const deleteEvent = async (id) => {
    try {
        const deleteEventQuery = `
            DELETE FROM "events" WHERE id = $1
        `;
        await pool.query(deleteEventQuery, [id]);
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};

const getEvents = async () => {
    try {
        const getEventsQuery = `
            SELECT * FROM "events" ORDER BY "date"
        `;
        const result = await pool.query(getEventsQuery);
        return result.rows;
    } catch (error) {
        console.error("Error getting events:", error);
        throw error;
    }
};

const getEventById = async (id) => {
    try {
        const getEventQuery = `
            SELECT * FROM "events" WHERE id = $1
        `;
        const result = await pool.query(getEventQuery, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error getting event by ID:", error);
        throw error;
    }
};

export const eventModel = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEventById,
};
