const express = require('express');
const NetProfitController = require('../controllers/net_profits.js');
const { isAuthorizedAsIn } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', NetProfitController.findOne);

module.exports = router;
