const jwt = require('jsonwebtoken')

const Usuario = require('../models/Usuario')

const getUsuarioByToken = async (token) => {
  const decoded = jwt.verify(token,process.env.SECRET_KEY)
  const userId = decoded.id
  let usuario = {}
  if (userId == -1) {
    usuario = {
      id: -1,
      nome: 'Usuario do sistema',
      username: 'ADMINSYS'
    }
  } else {
    usuario = await Usuario.findByPk(userId)
  }
  return usuario
}

module.exports = getUsuarioByToken
