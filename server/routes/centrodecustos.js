var express = require('express');
var router = express.Router();
const CentroDeCustosController = require('../controllers/CentroDeCustosController');
const verifyToken = require('../helpers/verify-token')

router.post('/novo', verifyToken, CentroDeCustosController.novo);
router.get('/todos', verifyToken, CentroDeCustosController.todos);
router.get('/pesquisa', verifyToken, CentroDeCustosController.pesquisa);
router.get('/:id', verifyToken, CentroDeCustosController.centroPorId);
router.put('/:id', verifyToken, CentroDeCustosController.atualize);
router.delete('/:id', verifyToken, CentroDeCustosController.delete);
module.exports = router;
