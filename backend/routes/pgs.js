const express = require('express');
const router = express.Router();
const pgController = require('../controllers/pgController');

router.get('/', pgController.listPGs);
router.get('/:id', pgController.getPG);
router.post('/contact', pgController.contactOwner);

module.exports = router;
