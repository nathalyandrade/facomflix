const express = require("express");
const jwt = require("jsonwebtoken");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");
const AulaController = require("./controllers/AulaController");
const SerieController = require("./controllers/SerieController");
const CategoriaController = require("./controllers/CategoriaController");

const autenticarUsuario = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res
            .status(401)
            .json({ success: false, message: "Usuário não está autenticado" }).end();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, usuario) => {
        if(err) {
            res
            .status(403)
            .json({ success: false, message: "Usuário sem permissão para essa transação" }).end();
        }
        
        req.usuario = usuario;
        next()
    });
}

routes.get("/usuario", UsuarioController.mostrarTipoUsuario); // mostrar tipo usuarios disponiveis
routes.post("/usuario", UsuarioController.cadastrarUsuario); // cadastrar usuario
routes.post("/usuario/login", UsuarioController.loginUsuario); // login usuario
routes.post("/usuario/testarLogin", autenticarUsuario, UsuarioController.testarLogin); // testar autenticacao


routes.get("/aula", autenticarUsuario, AulaController.mostrarAulas);
routes.post("/aula", autenticarUsuario, AulaController.cadastrarAula);
routes.delete("/aula/:id", autenticarUsuario, AulaController.apagarAula);
routes.put("/aula", autenticarUsuario, AulaController.editarAula);
routes.get("/aula/buscarPorNome/:nomeAula", autenticarUsuario, AulaController.buscarAulasPorNome);
routes.get("/aula/buscarPorNomeCategoria/:nomeCategoria", autenticarUsuario, AulaController.buscarAulasPorCategoria);


routes.get("/serie", autenticarUsuario, SerieController.mostrarSeries);
routes.post("/serie", autenticarUsuario, SerieController.cadastrarSerie);
routes.delete("/serie/:id", autenticarUsuario, SerieController.apagarSerie);
routes.put("/serie", autenticarUsuario, SerieController.editarSerie);

routes.get("/categoria", autenticarUsuario, CategoriaController.buscarCategorias);
routes.post("/categoria", autenticarUsuario, CategoriaController.cadastrarCategoria);
routes.delete("/categoria/:id", autenticarUsuario, CategoriaController.apagarCategoria);
routes.put("/categoria", autenticarUsuario, CategoriaController.editarCategoria);

module.exports = routes;
