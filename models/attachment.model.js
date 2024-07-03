import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';
import Turn from './turn.model.js';

const Attachment = sequelize.define('Attachment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  turn_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Turn,
      key: 'id'
    },
    onDelete: 'CASCADE'
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
