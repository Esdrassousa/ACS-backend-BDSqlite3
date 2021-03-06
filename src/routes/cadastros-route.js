
const express = require('express');

const router = express.Router();
const controller = require('../controllers/cadastros-controller');
const authorization = require('../services/auth-service')


router.post('/', authorization.authorize, controller.post);
router.get('/:cpf', controller.getByCpf);
router.delete('/:cpf' ,controller.delete)
router.put('/:cpf' ,controller.update)
module.exports  = router;
