const express = require('express')
const router = express.Router();

const controller = require('../controllers/user-controller');

router.post('/' , controller.post);
router.post('/authentication' , controller.authentication);
router.get('/' , controller.get);
router.delete('/:id' , controller.delete);


module.exports = router;