const express = require('express');
const SmwgController = require('../controllers/smwgs.js');
const SmwgItemController = require('../controllers/smwg_items.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAs('ADMIN'), SmwgController.findAll);
router.get('/:smwgId', isAuthorizedAs('ADMIN'), SmwgController.findOne);
router.post('/', isAuthorizedAs('ADMIN'), SmwgController.create);
router.put('/:smwgId', isAuthorizedAs('ADMIN'), SmwgController.update);
router.delete('/:smwgId', isAuthorizedAs('ADMIN'), SmwgController.destroy);

router.get('/:smwgId/items', SmwgItemController.findAll);

module.exports = router;
