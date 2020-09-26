const express = require("express");
const jwt = require("jsonwebtoken");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");
const AulaController = require("./controllers/AulaController");

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


routes.get("/aula", AulaController.mostrarAulas);
routes.post("/aula", AulaController.cadastrarAula);
routes.delete("/aula", AulaController.apagarAula);
routes.put("/aula", AulaController.editarAula);
routes.get("/aula/buscarPorNome/:nomeAula", autenticarUsuario, AulaController.buscarAulasPorNome);
routes.get("/aula/buscarPorNomeCategoria/:nomeCategoria", autenticarUsuario, AulaController.buscarAulasPorCategoria);


module.exports = routes;
