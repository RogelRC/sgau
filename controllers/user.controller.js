import User from '../models/user.model.js';
import bcrypt from "bcrypt"
import isStrongPassword from '../helpers/isStrongPassword.js'
import checkRole from '../helpers/checkRole.js'

export const createUser = async (userData) => {
    try {
        if(!isStrongPassword(userData.password)){
            throw new Error('The password is too weak');
        }
        if(!checkRole(userData.role)){
            throw new Error('Invalid role');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

export const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
};

export const getUserById = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');
        return user;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};

export const updateUser = async (userId, updateData) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');
        
        await user.update(updateData);
        return user;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

export const deleteUser = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');
        
        await user.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};