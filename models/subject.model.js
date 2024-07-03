import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Subject = sequelize.define('Subject', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  abbreviation: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'subjects',
  timestamps: false
});

export default Subject;
