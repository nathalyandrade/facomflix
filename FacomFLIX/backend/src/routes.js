const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");



routes.get("/usuario", UsuarioController.mostrarTipoUsuario);


module.exports = routes;
