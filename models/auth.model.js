import { pool } from "../database/connection.js";
import bcrypt from "bcrypt";

const authenticateUser = async (username, password) => {
    try {
        const getUserQuery = 'SELECT * FROM "users" WHERE "username" = $1';
        const { rows } = await pool.query(getUserQuery, [username]);
        const user = rows[0];

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return {
            username: user.username,
            name: user.name,
            role: user.role,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const authModel = {
    authenticateUser,
};