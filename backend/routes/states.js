const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');

router.get('/', stateController.listStates);

module.exports = router;
