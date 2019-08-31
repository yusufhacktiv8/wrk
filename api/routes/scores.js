const express = require('express');
const ScoreController = require('../controllers/scores.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/projectmonthyear', isAuthorizedAs('ADMIN'), ScoreController.findAllByProjectMonthYear);
router.get('/groupbymonth', isAuthorizedAs('ADMIN'), ScoreController.groupByMonth);
router.get('/groupbyproject', isAuthorizedAs('ADMIN'), ScoreController.groupByProjectId);

module.exports = router;
