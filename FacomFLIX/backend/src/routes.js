const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");



routes.get("/usuario", UsuarioController.mostrarTipoUsuario); // mostrar tipo usuarios disponiveis
routes.post("/usuario", UsuarioController.cadastrarUsuario); // cadastrar usuario

module.exports = routes;
