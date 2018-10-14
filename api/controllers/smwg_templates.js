const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const smwgType = req.query.smwgType ? parseInt(req.query.smwgType, 10) : 1;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.SmwgTemplate.findAndCountAll({
    where: {
      smwgType,
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
    limit,
    offset,
  })
  .then((smwgTemplates) => {
    res.json(smwgTemplates);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.SmwgTemplate.findOne({
    where: { id: req.params.smwgTemplateId },
  })
  .then((smwgTemplate) => {
    res.json(smwgTemplate);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const smwgTemplateForm = req.body;
  models.SmwgTemplate.create(smwgTemplateForm)
  .then((smwgTemplate) => {
    res.json(smwgTemplate);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const smwgTemplateForm = req.body;
  models.SmwgTemplate.update(
    smwgTemplateForm,
    {
      where: { id: req.params.smwgTemplateId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.SmwgTemplate.destroy(
    {
      where: { id: req.params.smwgTemplateId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
