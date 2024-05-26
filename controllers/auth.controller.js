// auth.controller.js
import { authModel } from "../models/auth.model.js";
import { generateToken, storeToken, invalidatePreviousTokens, invalidateToken } from "../utils/authUtils.js";

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await authModel.authenticateUser(username, password);

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        await invalidatePreviousTokens(username);
        const token = generateToken(user);
        await storeToken(token, username);

        res.json({ token, user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logoutUser = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    try {
        await invalidateToken(token);
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
