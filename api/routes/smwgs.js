const express = require('express');
const SmwgController = require('../controllers/smwgs.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAs('ADMIN'), SmwgController.findAll);
router.get('/:smwgId', isAuthorizedAs('ADMIN'), SmwgController.findOne);
router.post('/', isAuthorizedAs('ADMIN'), SmwgController.create);
router.put('/:smwgId', isAuthorizedAs('ADMIN'), SmwgController.update);
router.delete('/:smwgId', isAuthorizedAs('ADMIN'), SmwgController.destroy);

module.exports = router;
