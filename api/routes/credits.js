const express = require('express');
const CreditController = require('../controllers/credits.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAs('ADMIN'), CreditController.findAll);
router.get('/:creditId', isAuthorizedAs('ADMIN'), CreditController.findOne);
router.post('/', isAuthorizedAs('ADMIN'), CreditController.create);
router.put('/:creditId', isAuthorizedAs('ADMIN'), CreditController.update);
router.delete('/:creditId', isAuthorizedAs('ADMIN'), CreditController.destroy);

module.exports = router;
