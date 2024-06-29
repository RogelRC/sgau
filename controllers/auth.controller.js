import bcrypt from "bcrypt"
import { generateToken } from "../utils/authUtils.js"
import Token from '../models/auth.model.js';
import User from '../models/user.model.js';

export const createToken = async (tokenData) => {
    try {
        const token = await Token.create(tokenData);
        return token;
    } catch (error) {
        throw new Error(`Error creating token: ${error.message}`);
    }
};

export const getAllTokens = async () => {
    try {
        const tokens = await Token.findAll();
        return tokens;
    } catch (error) {
        throw new Error(`Error fetching tokens: ${error.message}`);
    }
};

export const getTokenByValue = async (tokenValue) => {
    try {
        const token = await Token.findOne({ where: { token: tokenValue } });
        if (!token) throw new Error('Token not found');
        return token;
    } catch (error) {
        throw new Error(`Error fetching token: ${error.message}`);
    }
};

export const updateToken = async (tokenValue, updateData) => {
    try {
        const token = await Token.findOne({ where: { token: tokenValue } });
        if (!token) throw new Error('Token not found');
        
        await token.update(updateData);
        return token;
    } catch (error) {
        throw new Error(`Error updating token: ${error.message}`);
    }
};

export const deleteToken = async (tokenValue) => {
    try {
        const token = await Token.findOne({ where: { token: tokenValue } });
        if (!token) throw new Error('Token not found');
        
        await token.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting token: ${error.message}`);
    }
};

export const authenticateUser = async (username, password) => {
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new Error('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid username or password');
        }

        // Token generation logic here (e.g., JWT)
        const token = await createToken({ token: generateToken(user), user_id: user.id});
        token.dataValues.name = user.name;
        token.dataValues.role = user.role;

        return token;
    } catch (error) {
        throw new Error(`Error authenticating user: ${error.message}`);
    }
};