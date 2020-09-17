const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('drj55vn7c0l36', 'fcaqeicsrqrwzg', 'bd8eb106388752416a310b8ca07ac2f1b87011a45764b9e3e43b6ea0f53024e1', {
    host: 'ec2-54-156-121-142.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: '5432',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
        native: true
        }
    });

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