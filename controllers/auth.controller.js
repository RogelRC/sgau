import { authModel } from "../models/auth.model.js";
import { generateToken, storeToken, invalidatePreviousTokens } from "../utils/authUtils.js";
import { pool } from "../database/connection.js"; // Importar la conexión a la base de datos

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await authModel.authenticateUser(username, password);

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        await invalidatePreviousTokens(user.id); // Cambiado a user.id
        const token = generateToken(user);
        await storeToken(token, user.id); // Cambiado a user.id

        res.json({ token, user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logoutUser = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    try {
        const invalidateTokenQuery = 'UPDATE "tokens" SET invalidated = true WHERE token = $1';
        await pool.query(invalidateTokenQuery, [token]);
        res.json({ message: "Successfully logged out" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
