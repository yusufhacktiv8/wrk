const models = require('../models');

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findByYear = function findByYear(req, res) {
  const { year } = req.query;
  models.Omzet.findAll({
    where: {
      year: year || MINIMUM_YEAR,
    },
    order: ['year', 'month'],
  })
  .then((omzets) => {
    res.json(omzets);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
