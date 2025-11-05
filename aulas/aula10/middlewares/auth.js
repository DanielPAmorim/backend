const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
   const { authorization } = req.headers;
   try {
      const token = authorization.split(" ")[1]
      const payload = jwt.verify(
        token,
        process.env.JWT_SEGREDO
      );
      req.payload = payload;
      return next();
   } catch (err) {
      res.status(401).json({msg: "Token invalido "});
   }
}

function gerarToken(payload) {
  const expiresIn = 30;
  try {
    const token = jwt.sign(
        payload, 
        process.env.JWT_SEGREDO,
        { expiresIn }
    );
    return token;
  } catch (err) {
    throw Error("Erro ao gerar token");
  }
}

function renovarToken(req, res){
    try{
        const payload = req.payload;
        res.json({token: gerarToken(payload)});
    } catch (err){
        res.status(500).json("Erro ao renovar token")
    }
}

module.exports = { verificarToken, gerarToken, renovarToken };