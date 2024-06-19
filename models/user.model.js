import { pool } from "../database/connection.js";
import bcrypt from "bcrypt";
import { isStrongPassword } from "../helpers/isStrongPassword.js";

// Obtener el menor id faltante
const getFirstMissingId = async () => {
    try {
        const query = 'SELECT get_first_missing_id() AS id';
        const { rows } = await pool.query(query);
        return rows[0].id;
    } catch (error) {
        console.error("Error getting first missing id:", error);
        throw error;
    }
};

const createUser = async (username, password, name, last_name, group, role) => {
    try {

        const checkUserQuery = 'SELECT * FROM "users" WHERE "username" = $1';
        const existingUser = await pool.query(checkUserQuery, [username]);

        if (existingUser.rows.length > 0) {
            return { rows: [], message: "Username already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newId = await getFirstMissingId();

        const insertUserQuery = `
            INSERT INTO "users" (id, username, password, role, name, last_name, "group")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING username, role, name, last_name, "group"
        `;
        const newUser = await pool.query(insertUserQuery, [newId, username, hashedPassword, role, name, last_name, group]);

        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

const updateUser = async (username, newUsername, name, last_name, group, newPassword, newRole) => {

    try {
        // Obtener el id del usuario basado en el username
        const userQuery = 'SELECT id FROM "users" WHERE username = $1';
        const userResult = await pool.query(userQuery, [username]);

        if (userResult.rowCount === 0) {
            throw new Error("User not found");
        }

        const userId = userResult.rows[0].id;

        // Update username
        if (newUsername && newUsername != username) {
            const updateUsernameQuery = 'UPDATE "users" SET username = $1 WHERE id = $2';
            await pool.query(updateUsernameQuery, [newUsername, userId]);
        }

        // Update name
        if (name) {
            const updateNameQuery = 'UPDATE "users" SET name = $1 WHERE id = $2';
            await pool.query(updateNameQuery, [name, userId]);
        }

        // Update last_name
        if (last_name) {
            const updateLastNameQuery = 'UPDATE "users" SET last_name = $1 WHERE id = $2';
            await pool.query(updateLastNameQuery, [last_name, userId]);
        }

        // Update group
        if (group) {
            const updateGroupQuery = 'UPDATE "users" SET "group" = $1 WHERE id = $2';
            await pool.query(updateGroupQuery, [group, userId]);
        }

        // Update password
        if (newPassword) {
            if (!isStrongPassword(newPassword)) {
                throw new Error("Password is not strong enough");
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatePasswordQuery = 'UPDATE "users" SET password = $1 WHERE id = $2';
            await pool.query(updatePasswordQuery, [hashedPassword, userId]);
        }

        // Update role
        if (newRole) {
            const updateRoleQuery = 'UPDATE "users" SET role = $1 WHERE id = $2';
            await pool.query(updateRoleQuery, [newRole, userId]);
        }

        // Retrieve the updated user data
        const updatedUserQuery = 'SELECT id, username, role, name, last_name, "group" FROM "users" WHERE id = $1';
        const result = await pool.query(updatedUserQuery, [userId]);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        const deleteUserQuery = 'DELETE FROM "users" WHERE "id" = $1';
        return await pool.query(deleteUserQuery, [userId]);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

const getUsers = async () => {
    try {
        const getUsersQuery = 'SELECT id, username, role, name, last_name, "group", creation_date, modification_date FROM "users"';
        const result = await pool.query(getUsersQuery);
        return result.rows;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
};

const getUserByUsername = async (username) => {
    try {
        const getUserQuery = 'SELECT * FROM "users" WHERE "username" = $1';
        const { rows } = await pool.query(getUserQuery, [username]);
        return rows[0];
    } catch (error) {
        console.error("Error fetching user by username:", error);
        throw error;
    }
};

export const userModel = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserByUsername,
};
