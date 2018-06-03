const models = require('../models');

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const { searchYear } = req.query;
  models.Revenue.findAll({
    where: {
      year: searchYear || MINIMUM_YEAR,
    },
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
  console.log(revenueForm);
  res.json(revenueForm);
  // models.Revenue.create(revenueForm)
  // .then((revenue) => {
  //   res.json(revenue);
  // })
  // .catch((err) => {
  //   sendError(err, res);
  // });
};

exports.update = function update(req, res) {
  const revenueForm = req.body;
  models.Revenue.update(
    revenueForm,
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
