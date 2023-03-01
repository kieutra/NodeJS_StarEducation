const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/NewsController');

router.get('/test1', newsController.showtest1);
router.get('/test2', newsController.showtest2);
router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
