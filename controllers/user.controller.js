// user.controller.js
import { userModel } from "../models/user.model.js";
import { isStrongPassword } from "../helpers/isStrongPassword.js";
import { pool } from "../database/connection.js"; // Importa pool para interactuar directamente con la base de datos

const createUser = async (req, res) => {
    try {
        
        const { username, password, name, last_name, group, role } = req.body;

        if (!isStrongPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password is not strong enough",
            });
        }

        const response = await userModel.createUser(username, password, name, last_name, group, role);

        if (response.rows.length > 0) {
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: {
                    username: response.rows[0].username,
                    role: response.rows[0].role,
                    name: response.rows[0].name,
                    last_name: response.rows[0].last_name,
                    group: response.rows[0].group,
                },
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Username already exists",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const updateUser = async (req, res) => {
    const { username } = req.params;

    const { newUsername, name, last_name, group, password, role } = req.body;

    try {
        if (password && !isStrongPassword(password)) {
            return res.status(400).json({ message: "Password is not strong enough" });
        }

        const updatedUser = await userModel.updateUser(username, newUsername, name, last_name, group, password, role);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const { id, username: updatedUsername, role: updatedRole, name: updatedName, last_name: updatedLastName, group: updatedGroup } = updatedUser;
        res.json({ id, username: updatedUsername, role: updatedRole, name: updatedName, last_name: updatedLastName, group: updatedGroup });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const deleteUser = async (req, res) => {
    try {
        const { username } = req.params;

        // Obtener el id del usuario a partir del username
        const user = await userModel.getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = user.id;

        // Eliminar tokens asociados al usuario
        await pool.query('DELETE FROM "tokens" WHERE "user_id" = $1', [userId]);

        // Eliminar el usuario
        const response = await userModel.deleteUser(userId);

        if (response.rowCount > 0) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers();
        res.json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userModel.getUserByUsername(username);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error getting user by username:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const userController = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserByUsername,
};
