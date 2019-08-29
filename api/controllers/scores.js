const sequelize = require('sequelize');
const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

const DIVIDER = 1000;

exports.findAllByMonthYear = function findAllByMonthYear(req, res) {
    const { year, month, projectCode, scoreType } = req.query;
  
    if (!year || !month || !projectCode || !scoreType) {
      res.json([]);
      return;
    }
  
    models.Score.findAll({
      where: {
        year,
        month,
        scoreType,
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

  exports.groupByMonth = function groupByMonth(req, res) {
    const { year } = req.query;

    models.Score.findAll({
      where: {
        year: year || MINIMUM_YEAR,
      },
      attributes: [
        'month', 
        'scoreType', 
        [sequelize.fn('sum', sequelize.col('raScore')), 'raScoreSum'],
        [sequelize.fn('sum', sequelize.col('riScore')), 'riScoreSum'],
      ],
      group : ['month', 'scoreType'],
      raw: true,
      order: ['month', 'scoreType']
    })
    .then((scoreSums) => {
      res.json(scoreSums.map(obj => {
        return {
          month: obj.month,
          scoreType: obj.scoreType,
          raScoreSum: obj.raScoreSum / DIVIDER,
          riScoreSum: obj.riScoreSum / DIVIDER,
        }
      }));
    }).catch((err) => {
      sendError(err, res);
    });
  };

  exports.groupByProjectId = function groupByProjectId(req, res) {
    const { year, month, scoreType } = req.query;

    models.Score.findAll({
      where: {
        year: year || MINIMUM_YEAR,
        month,
        scoreType,
      },
      include: [
        {
          model: models.Project,
          required: true,
          attributes: [],
        },
      ],
      attributes: [
        'ProjectId', 
        [sequelize.fn('sum', sequelize.col('raScore')), 'raScoreSum'],
        [sequelize.fn('sum', sequelize.col('riScore')), 'riScoreSum'],
      ],
      group : ['ProjectId'],
      raw: true,
      order: ['ProjectId']
    })
    .then((scoreSums) => {
      console.log(scoreSums);
      
      res.json(scoreSums.map(obj => {
        return {
          projectId: obj.ProjectId,
          raScoreSum: obj.raScoreSum / DIVIDER,
          riScoreSum: obj.riScoreSum / DIVIDER,
        }
      }));
    }).catch((err) => {
      sendError(err, res);
    });
  };
