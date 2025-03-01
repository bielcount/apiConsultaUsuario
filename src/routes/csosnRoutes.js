const express = require('express');
const router = express.Router();
const csosnController = require('../controllers/csosnController');

router.get('/csosn', csosnController.getAllCsosn);
router.get('/csosn/:codigo', csosnController.getCsosnByCode);

module.exports = router;
