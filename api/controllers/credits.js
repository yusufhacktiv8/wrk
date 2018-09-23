const models = require('../models');

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const { searchYear } = req.query;
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Credit.findAndCountAll({
    where: {
      year: searchYear || MINIMUM_YEAR,
    },
    order: ['year', 'month'],
    limit,
    offset,
  })
  .then((credits) => {
    res.json(credits);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findByYear = function findByYear(req, res) {
  const { year } = req.query;
  models.Credit.findAll({
    where: {
      year: year || MINIMUM_YEAR,
    },
    order: ['year', 'month'],
  })
  .then((credits) => {
    res.json(credits);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.Credit.findOne({
    where: { id: req.params.creditId },
  })
  .then((credit) => {
    res.json(credit);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const creditForm = req.body;
  models.Credit.create(creditForm)
  .then((credit) => {
    res.json(credit);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const creditForm = req.body;
  models.Credit.update(
    creditForm,
    {
      where: { id: req.params.creditId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Credit.destroy(
    {
      where: { id: req.params.creditId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
