import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  image_path: {
    type: DataTypes.STRING(255),
  }
}, {
  tableName: 'events',
  timestamps: false
});

export default Event;
