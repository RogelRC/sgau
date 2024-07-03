import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  group: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'schedule',
  timestamps: false
});

export default Schedule;
