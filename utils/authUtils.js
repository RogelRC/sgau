// utils/authUtils.js
import jwt from "jsonwebtoken";
import { pool } from "../database/connection.js";

const secretKey = process.env.JWT_SECRET;

// Generar token
export const generateToken = (user) => {
    return jwt.sign({ username: user.username, role: user.role }, secretKey, { expiresIn: "15m" });
};

// Guardar token
export const storeToken = async (token, username) => {
    const query = 'INSERT INTO "tokens" (token, username) VALUES ($1, $2)';
    await pool.query(query, [token, username]);
};

// Invalidar tokens previos
export const invalidatePreviousTokens = async (username) => {
    const query = 'UPDATE "tokens" SET invalidated = true WHERE username = $1';
    await pool.query(query, [username]);
};

// Invalidar un token específico (logout)
export const invalidateToken = async (token) => {
    const query = 'UPDATE "tokens" SET invalidated = true WHERE token = $1';
    await pool.query(query, [token]);
};

// Verificar si el token es válido
export const isTokenValid = async (token) => {
    const query = 'SELECT invalidated FROM "tokens" WHERE token = $1';
    const result = await pool.query(query, [token]);
    return result.rows.length > 0 && !result.rows[0].invalidated;
};
