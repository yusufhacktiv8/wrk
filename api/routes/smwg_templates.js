const express = require('express');
const SmwgTemplateController = require('../controllers/smwg_templates.js');
const { isAuthorizedAs } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/', isAuthorizedAs('ADMIN'), SmwgTemplateController.findAll);
router.get('/:smwgTemplateId', isAuthorizedAs('ADMIN'), SmwgTemplateController.findOne);
router.post('/', isAuthorizedAs('ADMIN'), SmwgTemplateController.create);
router.put('/:smwgTemplateId', isAuthorizedAs('ADMIN'), SmwgTemplateController.update);
router.delete('/:smwgTemplateId', isAuthorizedAs('ADMIN'), SmwgTemplateController.destroy);

module.exports = router;
