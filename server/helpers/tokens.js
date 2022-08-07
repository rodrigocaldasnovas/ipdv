const jwt = require("jsonwebtoken")

const createUsuarioToken = async (usuario, req, res) => {
  const token = jwt.sign({
    nome: usuario.nome,
    id: usuario.id
  }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE_IN })
  res.status(200).json({
    response: true,
    message: 'Autenticado',
    payload: {
      id: usuario.id,
      nome: usuario.nome,
      username: usuario.username,
      token
    }
  })
}

module.exports = createUsuarioToken
