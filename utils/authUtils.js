import jwt from "jsonwebtoken";
import { pool } from "../database/connection.js";

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const storeToken = async (token, userId) => {
    try {
        const storeTokenQuery = 'INSERT INTO "tokens" (token, user_id) VALUES ($1, $2)';
        await pool.query(storeTokenQuery, [token, userId]);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const invalidatePreviousTokens = async (userId) => {
    try {
        const invalidateTokensQuery = 'UPDATE "tokens" SET invalidated = true WHERE user_id = $1';
        await pool.query(invalidateTokensQuery, [userId]);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const isTokenValid = async (token) => {
    try {
        const checkTokenQuery = 'SELECT * FROM "tokens" WHERE token = $1 AND invalidated = false';
        const { rows } = await pool.query(checkTokenQuery, [token]);
        return rows.length > 0;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
