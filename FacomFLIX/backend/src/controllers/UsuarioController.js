require('dotenv').config();
const { models } = require('../../configBD');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async mostrarTipoUsuario(req, res) {
        try {
            const tipoUsuario = await models.TipoUsuario.findAll();

            if (tipoUsuario) {
                
                return res.json(tipoUsuario);
            }
            
            throw new Error("Erro");

        } catch (e) {
            console.log(e.message);
            return res
                .status(500)
                .json({ success: false, message: "Erro ao encontrar tipo usuario" });
        }
    },

    async cadastrarUsuario(req, res) {
        try {
            let usuario = req.body;
            usuario.dataCriacao = new Date();
            
            if (usuario != null) {
                await models.Usuario.create(usuario);
                return res
                    .status(201)
                    .json({ success: true, message: "Usuário cadastrado!" }).end();
            }
            throw new Error("Erro");

        } catch (error) {
            console.log(error.message);
            return res
                .status(500)
                .json({ success: false, message: "Erro ao encontrar tipo usuario" });
        }
    },

    async loginUsuario(req, res) {
        try {
            let usuario = await models.Usuario.findOne({ where: { login: req.body.login } });
            
            if(usuario){
                if (await bcrypt.compare(req.body.senha, usuario.senha)) {
                    let nome = { nome: usuario.nome };
                    const tokenAcesso = await jwt.sign(nome, process.env.ACCESS_TOKEN_SECRET);
                    const usuarioLogado = {
                        id: usuario.id,
                        nome: usuario.nome,
                        email: usuario.email,
                        login: usuario.login,
                        matricula: usuario.matricula,
                        tipoUsuario: usuario.tipoUsuario,
                        token: "Bearer " + tokenAcesso
                    }

                    return res
                        .status(200)
                        .json({ message: "Usuário logado com sucesso" , success: true, usuario: usuarioLogado });
                } else {
                    return res
                        .status(500)
                        .json({ message: "Senha incorreta" , success: true });
                }
            } else {
                return res
                    .status(500)
                    .json({ message: "Usuário ou senha incorreto" , success: true });
            }
            
        } catch (error) {
            console.log(error.message);
            return res
                .status(500)
                .json({ success: false, message: "Erro ao encontrar tipo usuario" });
        }
    },

    async testarLogin(req, res){
        try {
            let usuario = await models.Usuario.findOne({ where: { login: req.body.login } });
            if(usuario){
                return res
                    .status(200)
                    .json({ message: "Token ta onnnnnnnnnnn!!!!!!!!!!!" , success: true, usuario: usuario });
            }
            
        } catch (error) {
            console.log(error.message);
            return res
                .status(500)
                .json({ success: false, message: "Erro ao encontrar tipo usuario" });
        }
    }

}

   // function validarSenha(senha) {
    //     return bcrypt.compare(senha, this.password);
    // };