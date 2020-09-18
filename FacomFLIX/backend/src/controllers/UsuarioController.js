const { models } = require('../../configBD');

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
    }
}

   // function validarSenha(senha) {
    //     return bcrypt.compare(senha, this.password);
    // };