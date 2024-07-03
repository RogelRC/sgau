import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Classroom = sequelize.define('Classroom', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  faculty_number: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  year: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  number: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['Aula', 'Salón']]
    }
  }
}, {
  tableName: 'classroom',
  timestamps: false,
});

export default Classroom;
