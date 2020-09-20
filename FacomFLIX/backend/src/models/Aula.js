const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Aula', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        link: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'link_aula'
        },
        nome: {
            type: DataTypes.STRING(70),
            allowNull:  false
        },
        quantidadeDeVisualizacoes: {
            type: DataTypes.INTEGER,
            allowNull:  true,
            field: 'quantidade_de_visualizacoes'
        },
        usuarioUpload: {
            type: DataTypes.INTEGER,
            field: 'fk_usuario_upload',
            allowNull: false,
            references:{
                model: 'Usuario',
                key: 'id'
            }
        },
        serie: {
            type: DataTypes.INTEGER,
            field: 'fk_serie',
            allowNull: false,
            references:{
                model: 'Serie',
                key: 'id'
            }
        },
        categoria: {
            type: DataTypes.INTEGER,
            field: 'fk_categoria',
            allowNull: false,
            references:{
                model: 'Categoria',
                key: 'id'
            }
        }
    }, {
        tableName: 'aula' // forcar o nome da tabela no banco
    });
};
