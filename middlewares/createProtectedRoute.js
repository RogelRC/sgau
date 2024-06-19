import jwt from "jsonwebtoken";
import { isTokenValid } from "../utils/authUtils.js";

export const protectedRoute = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const valid = await isTokenValid(token);
        if (!valid) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};
