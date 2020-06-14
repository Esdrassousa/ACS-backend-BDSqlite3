const express = require('express')
const router = express.Router();

const controller = require('../controllers/user-controller');

router.post('/' , controller.post);
router.post('/authentication' , controller.create);
router.get('/' , controller.get);


module.exports = router;