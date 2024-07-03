import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Turn = sequelize.define('Turn', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 29
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  task: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  subject_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'subjects',
      key: 'id'
    },
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false
  },
  classroom_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'classroom',
      key: 'id'
    },
    allowNull: false
  },
  schedule_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'schedule',
      key: 'id'
    },
    allowNull: false
  },
}, {
  tableName: 'turns',
  timestamps: false
});

export default Turn;
