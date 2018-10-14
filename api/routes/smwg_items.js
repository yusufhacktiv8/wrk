const express = require('express');
const SmwgItemController = require('../controllers/smwg_items.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAs('ADMIN'), SmwgItemController.findAll);
router.get('/bysmwg', SmwgItemController.bySmwg);
router.post('/', isAuthorizedAs('ADMIN'), SmwgItemController.create);
router.put('/:smwgItemId', isAuthorizedAs('ADMIN'), SmwgItemController.update);
router.delete('/:smwgItemId', isAuthorizedAs('ADMIN'), SmwgItemController.destroy);

module.exports = router;
