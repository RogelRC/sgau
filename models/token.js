// models/token.js
module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('Token', {
      token: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // Nombre del modelo en singular
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      creation_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      invalidated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      timestamps: false, // Desactiva los timestamps automáticos de Sequelize
      tableName: 'tokens' // Nombre real de la tabla en la base de datos
    });
  
    return Token;
  };
  