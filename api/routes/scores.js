const express = require('express');
const ScoreController = require('../controllers/scores.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/bymonthyear', isAuthorizedAs('ADMIN'), ScoreController.findAllByMonthYear);

module.exports = router;
