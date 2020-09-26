require('dotenv').config();
const { models, model } = require('../../configBD');
const { Op } = require("sequelize");

module.exports = {
    async mostrarAulas (req, res) {
        try {
            const Aula = await models.Aula.findAll();
    
            if (Aula) {
                return res.json(Aula);
            }
    
            throw new Error("Erro");
    
        } catch (e) {
            console.log(e.message);
            return res
                .status(500)
                .json({ success: false, message: "Erro ao encontrar aula" });
        }
    },

    async cadastrarAula (req, res){
        return res.send("Entrei em cadastrarAula");
    },

    async apagarAula (req, res){
        return res.send("Entrei no apagarAula");
    },

    async editarAula (req, res){
        return res.send("Entrei no editarAula");
    },

    async buscarAulasPorNome(req, res) {
        try {
            const listaAulas = await models.Aula.findAll({ 
                where: { nome: { [Op.iLike]: '%'+req.params.nomeAula+'%'} }, 
                include: [{ model: models.Categoria, as: 'detalhesCategoria'}, { model: models.SerieAula, as: 'detalhesSerie'}] 
            }); // required: true, para trazer apenas aulas vinculadas com o Model Categorias
            if(listaAulas) {
                return res
                    .status(200)
                    .json(listaAulas);
            }
            return res
                .status(200)
                .json([]);
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({message: "Erro ao buscar aula por nome"});
        }
    },

    async buscarAulasPorCategoria(req, res){
        try {
            const listaAulas = await models.Aula.findAll({
                include: 
                [
                    {   
                        model: models.Categoria, 
                        as: 'detalhesCategoria',
                        where: { nome: { [Op.iLike]: '%'+req.params.nomeCategoria+'%' }},
                    },
                    { model: models.SerieAula, as: 'detalhesSerie'}
                ] 
            });
    
            if(listaAulas) {
                return res
                    .status(200)
                    .json(listaAulas);
            }

            return res
                .status(200)
                .json([]);
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({message: "Erro ao buscar aula por nome da categoria"});
        }
    }
    
}


   




