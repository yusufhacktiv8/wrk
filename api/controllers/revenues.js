const models = require('../models');

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const { searchYear } = req.query;
  models.Revenue.findAndCountAll({
    where: {
      // year: searchYear || MINIMUM_YEAR,
    },
    order: ['year', 'month'],
  })
  .then((revenues) => {
    res.json(revenues);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.Revenue.findOne({
    where: { id: req.params.revenueId },
  })
  .then((revenue) => {
    res.json(revenue);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const revenueForm = req.body;
  const data = JSON.stringify(revenueForm.hasilUsaha);
  models.Revenue.create({
    month: revenueForm.month,
    year: revenueForm.year,
    data,
  })
  .then((revenue) => {
    res.json(revenue);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const revenueForm = req.body;
  const data = JSON.stringify(revenueForm.hasilUsaha);
  models.Revenue.update(
    {
      month: revenueForm.month,
      year: revenueForm.year,
      data,
    },
    {
      where: { id: req.params.revenueId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Revenue.destroy(
    {
      where: { id: req.params.revenueId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
