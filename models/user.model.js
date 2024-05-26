// user.model.js
import { pool } from "../database/connection.js";
import bcrypt from "bcrypt";
import { isStrongPassword } from "../helpers/isStrongPassword.js";

const createUser = async (username, password, name, last_name, group, role) => {
    try {
        const checkUserQuery = 'SELECT * FROM "users" WHERE "username" = $1';
        const existingUser = await pool.query(checkUserQuery, [username]);

        if (existingUser.rows.length > 0) {
            return { rows: [], message: "Username already exists" };
        }

        if (!isStrongPassword(password)) {
            return { rows: [], message: "Password is not strong enough" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = `
            INSERT INTO "users" (username, password, name, last_name, "group", role)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING username, role, name, last_name, "group"
        `;
        const newUser = await pool.query(insertUserQuery, [username, hashedPassword, name, last_name, group, role]);

        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

const updateUser = async (username, newPassword, newRole) => {
    try {
        let updateFields = [];
        let values = [];

        if (newPassword) {
            if (!isStrongPassword(newPassword)) {
                throw new Error("Password is not strong enough");
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updateFields.push(`password = $${updateFields.length + 1}`);
            values.push(hashedPassword);
        }

        if (newRole) {
            updateFields.push(`role = $${updateFields.length + 1}`);
            values.push(newRole);
        }

        if (updateFields.length === 0) {
            throw new Error("No fields provided for update");
        }

        values.push(username);

        const updateQuery = `
            UPDATE "users"
            SET ${updateFields.join(", ")}
            WHERE username = $${values.length}
            RETURNING username, role
        `;
        const result = await pool.query(updateQuery, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

const deleteUser = async (username) => {
    try {
        const deleteUserQuery = 'DELETE FROM "users" WHERE "username" = $1';
        return await pool.query(deleteUserQuery, [username]);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

const getUsers = async () => {
    try {
        const getUsersQuery = 'SELECT username, role, name, last_name, creation_date, modification_date FROM "users"';
        const result = await pool.query(getUsersQuery);
        return result.rows;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
};

const getUserByUsername = async (username) => {
    try {
        const getUserQuery = 'SELECT username, role, name, last_name, creation_date, modification_date FROM "users" WHERE username = $1';
        const result = await pool.query(getUserQuery, [username]);
        return result.rows[0];
    } catch (error) {
        console.error("Error getting user by username:", error);
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
