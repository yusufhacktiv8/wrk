const express = require('express');
const RevenueController = require('../controllers/revenues.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAs('ADMIN'), RevenueController.findAll);
router.get('/byyearmonth', RevenueController.byYearMonth);
router.post('/', isAuthorizedAs('ADMIN'), RevenueController.create);
router.put('/:revenueId', isAuthorizedAs('ADMIN'), RevenueController.update);
router.delete('/:revenueId', isAuthorizedAs('ADMIN'), RevenueController.destroy);

module.exports = router;
