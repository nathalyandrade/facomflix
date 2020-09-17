const { models } = require('../../configBD');

module.exports = {
    async mostrarTipoUsuario(req, res) {
        try {
            const tipoUsuario = await models.TipoUsuario.findAll();

            if (tipoUsuario != null) {
                console.log('entrei aqui?', tipoUsuario);
                return res.json(tipoUsuario);
            }

            return res
                .status(500)
                .json({ success: false, message: "Erro ao encontrar usuário" });
        } catch (e) {
            console.log(e);
        }
    }
}