import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';
import User from './user.model.js';
import Subject from './subject.model.js';

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  day: {
    type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'),
    allowNull: false
  },
  turn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 6
    }
  },
  hour: {
    type: DataTypes.TIME,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  subject_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Subject,
      key: 'id'
    },
    allowNull: false
  }
}, {
  tableName: 'schedule',
  timestamps: false
});

export default Schedule;
