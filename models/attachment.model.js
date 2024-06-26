import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';
import Schedule from './schedule.model.js';

const Attachment = sequelize.define('Attachment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  schedule_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Schedule,
      key: 'id'
    },
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  upload_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'attachments',
  timestamps: false
});

export default Attachment;
