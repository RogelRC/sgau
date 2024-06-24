import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Token = sequelize.define('Token', {
    token: {
        type: DataTypes.STRING(255),
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    creation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    invalidated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false,
    tableName: 'tokens'
});

export default Token;