var express = require('express');
var router = express.Router();
const scraperController = require('../controllers/scr.controller')

router.get('/', scraperController.getData);

module.exports = router;
