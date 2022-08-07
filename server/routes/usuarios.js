var express = require('express');
var multer = require('multer')
var path = require('path')
var router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');

const verifyToken = require('../helpers/verify-token')

const upload = multer()

router.post('/importacao', verifyToken, upload.single('file'), (req, res, next) => {
  next()
}, UsuariosController.importacao);
router.post('/novo', verifyToken, UsuariosController.novo);
router.get('/pesquisa', verifyToken, UsuariosController.pesquisa);
router.post('/login', UsuariosController.login);
router.get('/checkusuario', verifyToken, UsuariosController.checkUsuario);
router.get('/:id', verifyToken, UsuariosController.usuarioPorId);
router.put('/:id', verifyToken, UsuariosController.atualize);
router.delete('/:id', verifyToken, UsuariosController.delete);

module.exports = router;
