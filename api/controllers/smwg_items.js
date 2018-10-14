const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const smwgId = req.params.smwgId;
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.SmwgItem.findAndCountAll({
    where: {},
    include: [
      {
        model: models.Smwg,
        required: true,
        where: { id: smwgId },
      },
    ],
    limit,
    offset,
    order: ['smwgSequence'],
  })
  .then((smwgItems) => {
    res.json(smwgItems);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.bySmwg = function bySmwg(req, res) {
  const { year, month, smwgType } = req.query;
  models.SmwgItem.findAll({
    where: {},
    include: [
      {
        model: models.Smwg,
        required: true,
        where: { year, month, smwgType },
      },
    ],
    order: ['smwgSequence'],
  })
  .then((smwgItems) => {
    res.json(smwgItems);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.SmwgItem.findOne({
    where: { id: req.params.smwgItemId },
  })
  .then((smwgItem) => {
    res.json(smwgItem);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const smwgItemForm = req.body;
  const smwgId = smwgItemForm.smwg;

  smwgItemForm.SmwgId = smwgId;
  models.SmwgItem.create(smwgItemForm)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const smwgItemForm = req.body;
  models.SmwgItem.update(
    smwgItemForm,
    {
      where: { id: req.params.smwgItemId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.SmwgItem.destroy(
    {
      where: { id: req.params.smwgItemId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
