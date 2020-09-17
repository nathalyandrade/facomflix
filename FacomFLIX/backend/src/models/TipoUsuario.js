const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres::memory:');

 const TipoUsuario = sequelize.define('tipo_usuario', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
   
});


module.exports = {TipoUsuario};