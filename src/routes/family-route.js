const express = require('express')

const router = express.Router();

const controller = require('../controllers/family-controller')
const authorization = require('../services/auth-service')

router.post('/' ,authorization.authorize, controller.post)
router.get('/buscar' , controller.buscaFamilia)
router.get('/' , controller.get)
router.post('/id' , controller.create)
router.delete('/:id' , controller.delete)

module.exports = router;