var express = require('express');
var router = express.Router();
const DepartamentosController = require('../controllers/DepartamentosController');
const verifyToken = require('../helpers/verify-token')

router.post('/novo', verifyToken, DepartamentosController.novo);
router.get('/pesquisa', verifyToken, DepartamentosController.pesquisa);
router.get('/todos', verifyToken, DepartamentosController.todos);
router.get('/:id', verifyToken, DepartamentosController.departamentoPorId);
router.put('/:id', verifyToken, DepartamentosController.atualize);
router.delete('/:id', verifyToken, DepartamentosController.delete);

module.exports = router;
