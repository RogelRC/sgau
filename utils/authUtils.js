import Token from '../models/auth.model.js';
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    try{
        Token.destroy({ where: {user_id: user.id} })

        return jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

export const isTokenValid = async (token) => {
    try {
        const rows = await Token.findOne({ where: { token: token, invalidated: false} });
        return rows && rows.token.length > 0;

    } catch (error) {
        console.error(error);
        throw error;
    }
};