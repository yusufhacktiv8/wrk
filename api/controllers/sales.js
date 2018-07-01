const models = require('../models');

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findByYear = function findByYear(req, res) {
  const { searchYear } = req.query;
  models.Sales.findAll({
    where: {
      year: searchYear || MINIMUM_YEAR,
    },
    order: ['year', 'month'],
  })
  .then((sales) => {
    res.json(sales);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
