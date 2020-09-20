require('dotenv').config();
const { models } = require('../../configBD');
const jwt = require("jsonwebtoken");

const AulaController = {};

AulaController.mostrarAulas = async function (req, res){
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
}

AulaController.cadastrarAula = function (req, res){
    return res.send("Entrei em cadastrarAula");
}

AulaController.apagarAula = function (req, res){
    return res.send("Entrei no apagarAula");
}

AulaController.editarAula = function (req, res){
    return res.send("Entrei no editarAula");
}
module.exports = AulaController;