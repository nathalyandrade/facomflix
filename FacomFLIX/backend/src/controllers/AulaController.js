require('dotenv').config();
const { models } = require('../../configBD');
const jwt = require("jsonwebtoken");

const AulaController = {};

AulaController.mostrarAulas = function (req, res){
    return res.send("Entrei em mostrarAulas");
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