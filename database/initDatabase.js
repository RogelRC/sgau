import { pool } from './connection.js';

const createTables = async () => {
    const userTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            role VARCHAR(50) NOT NULL,
            "group" VARCHAR(50),
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE OR REPLACE FUNCTION update_modification_date()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.modification_date = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE OR REPLACE TRIGGER set_modification_date
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_modification_date();
    `;

    const tokenTableQuery = `
        CREATE TABLE IF NOT EXISTS tokens (
            token VARCHAR(255) PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            invalidated BOOLEAN DEFAULT FALSE
        );
    `;

    const eventTableQuery = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            date DATE NOT NULL,
            time TIME NOT NULL,
            location VARCHAR(255) NOT NULL,
            image_path VARCHAR(255)
        );
    `;

    const subjectsTableQuery = `
        CREATE TABLE IF NOT EXISTS subjects (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        );
    `;

    const scheduleTableQuery = `
        CREATE TABLE IF NOT EXISTS schedule (
            id SERIAL PRIMARY KEY,
            day VARCHAR(20) NOT NULL CHECK (day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')),
            turn INTEGER NOT NULL CHECK (turn >= 1 AND turn <= 6),
            user_id INTEGER NOT NULL REFERENCES users(id),
            subject_id INTEGER NOT NULL REFERENCES subjects(id)
        );
    `;

    const attachmentsTableQuery = `
        CREATE TABLE IF NOT EXISTS attachments (
            id SERIAL PRIMARY KEY,
            schedule_id INTEGER NOT NULL REFERENCES schedule(id) ON DELETE CASCADE,
            file_path VARCHAR(255) NOT NULL,
            upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(userTableQuery);
        await pool.query(tokenTableQuery);
        await pool.query(eventTableQuery);
        await pool.query(subjectsTableQuery);
        await pool.query(scheduleTableQuery);
        await pool.query(attachmentsTableQuery);
        console.log("Tables created successfully");
    } catch (error) {
        console.error("Error creating tables:", error);
    } finally {
        pool.end();
    }
};

createTables();
