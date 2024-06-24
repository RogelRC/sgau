import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    group: {
        type: DataTypes.STRING(50)
    },
    creation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    modification_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'users'
});

User.addHook('beforeUpdate', (user, options) => {
    user.modification_date = new Date();
});

export default User;
