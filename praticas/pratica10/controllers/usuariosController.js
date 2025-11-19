const { cifrarSenha, gerarToken } = require('../middlewares/authMiddleware.js');
const usuariosModel = require('../models/usuariosModel.js');

async function criar(req, res) {
    try {
        const senhaCifrada = cifrarSenha(req.body.senha);
        const novoUsuario = await usuariosModel.create({
            email: req.body.email,
            senha: senhaCifrada
        });
        return res.status(201).json({
            _id: novoUsuario._id,
            email: novoUsuario.email
        });
    } 
    catch (erro) {
        return res.status(422).json({
            msg: "Email e Senha são obrigatórios"
        });
    }
}

module.exports = criar;