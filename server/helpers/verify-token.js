const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

const checkToken = (req, res, next) => {
  const token = getToken(req)
  if(!req.headers.authorization) {
    return res.status(401).json({
      message: 'Acesso negado'
    })
  }
  if (!token) {
    return res.status(401).json({
      message: 'Acesso negado'
    })
  }
  try {
    const verified = jwt.verify(token,process.env.SECRET_KEY)
    if (!verified) {
      return res.status(401).json({
        code: 130,
        message: 'O token esta expirado!'
      })
    }
    req.usuario = verified
    next()
  } catch(err) {
    return res.status(400).json({
      message: 'Acesso negado'
    })
  }
}

module.exports = checkToken
