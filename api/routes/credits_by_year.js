const express = require('express');
const CreditController = require('../controllers/credits.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', CreditController.findByYear);

module.exports = router;
