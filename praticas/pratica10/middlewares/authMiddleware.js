const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

function verificarToken(req, res, next) {
    const { authorization } = req.headers;
    try {
      const token = authorization.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SEGREDO);
      req.payload = {
        iss: payload.iss,
        aud: payload.aud,
        email: payload.email,
        nome: payload.nome,
      };
      return next();
    } catch (err) {
      res.status(401).json({ msg: "Token invalido " });
    }
  }

  function gerarToken(payload) {
    const expiresIn = 30;
    try {
      const token = jwt.sign(payload, process.env.JWT_SEGREDO, { expiresIn });
      return token;
    } catch (err) {
      throw Error("Erro ao gerar token");
    }
  }
  function cifrarSenha(senha) {
    const salto = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salto);
    return hash;
}
function compararSenha(senha, hash) {
    return bcrypt.compareSync(senha, hash);
}

module.exports = {verificarToken, gerarToken, cifrarSenha, compararSenha};