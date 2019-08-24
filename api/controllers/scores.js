const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAllByMonthYear = function findAllByMonthYear(req, res) {
    const { year, month, projectCode } = req.query;
  
    if (!year || !month || !projectCode) {
      res.json([]);
      return;
    }
  
    models.Score.findAll({
      where: {
        year,
        month,
      },
      include: [
        {
          model: models.Project,
          required: true,
          where: {
            code: projectCode,
          },
        },
      ],
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      sendError(err, res);
    });
  };
