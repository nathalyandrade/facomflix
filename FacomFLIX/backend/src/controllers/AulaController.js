require('dotenv').config();
const { models } = require('../../configBD');
const jwt = require("jsonwebtoken");

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
    }
}


   




