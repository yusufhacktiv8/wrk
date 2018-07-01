const express = require('express');
const SalesController = require('../controllers/sales.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', SalesController.findByYear);

module.exports = router;
