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

        CREATE TRIGGER set_modification_date
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_modification_date();

        CREATE OR REPLACE FUNCTION get_first_missing_id()
        RETURNS INTEGER AS $$
        DECLARE
            result INTEGER;
        BEGIN
            SELECT MIN(t1.id + 1) INTO result
            FROM users t1
            LEFT JOIN users t2 ON t1.id + 1 = t2.id
            WHERE t2.id IS NULL;

            IF result IS NULL THEN
                RETURN 1;
            ELSE
                RETURN result;
            END IF;
        END;
        $$ LANGUAGE plpgsql;
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
            image BYTEA
        );
    `;

    try {
        await pool.query(userTableQuery);
        await pool.query(tokenTableQuery);
        await pool.query(eventTableQuery);
        console.log("Tables created successfully");
    } catch (error) {
        console.error("Error creating tables:", error);
    } finally {
        pool.end();
    }
};

createTables();
