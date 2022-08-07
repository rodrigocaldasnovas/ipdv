var express = require('express');
var router = express.Router();
const CargosController = require('../controllers/CargosController');
const verifyToken = require('../helpers/verify-token')

router.post('/novo', verifyToken, CargosController.novo);
router.get('/todos', verifyToken, CargosController.todos);
router.get('/pesquisa', verifyToken, CargosController.pesquisa);
router.get('/:id', verifyToken, CargosController.cargoPorId);
router.put('/:id', verifyToken, CargosController.atualize);
router.delete('/:id', verifyToken, CargosController.delete);

module.exports = router;
