const sequelize = require('sequelize');
const models = require('../models');

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

const OMZETS_KEY = 'OMZETS';
const SALES_KEY = 'SALES';
const CREDITS_KEY = 'CREDITS';
const NET_PROFITS_KEY = 'NET_PROFITS';
const EPC_SUMS_KEY = 'EPC_SUMS';

const DIVIDER = 1000;

const findOmzets = (year) => (
    new Promise((resolve, reject) => {
        models.Omzet.findAll({
            where: {
              year: year || MINIMUM_YEAR,
            },
            order: ['year', 'month'],
          })
          .then((omzets) => {
            resolve({
                key: OMZETS_KEY,
                result: omzets.map(obj => {
                  return {
                    month: obj.month,
                    plan: obj.plan / DIVIDER,
                    actual: obj.actual / DIVIDER,
                    prognosa: obj.prognosa / DIVIDER,
                  }
                }),
            });
          })
          .catch((err) => {
            reject(err);
          });
    })
);

const findSales = (year) => (
    new Promise((resolve, reject) => {
      models.Sales.findAll({
        where: {
          year: year || MINIMUM_YEAR,
        },
        order: ['year', 'month'],
      })
      .then((sales) => {
        resolve({
            key: SALES_KEY,
            result: sales.map(obj => {
              return {
                month: obj.month,
                plan: obj.plan / DIVIDER,
                actual: obj.actual / DIVIDER,
                prognosa: obj.prognosa / DIVIDER,
              }
            }),
        });
      })
      .catch((err) => {
        reject(err);
      });
    })
);

const findCredits = (year) => (
  new Promise((resolve, reject) => {
      models.Credit.findAll({
          where: {
            year: year || MINIMUM_YEAR,
          },
          order: ['year', 'month'],
        })
        .then((credits) => {
          resolve({
              key: CREDITS_KEY,
              result: credits.map(obj => {
                return {
                  month: obj.month,
                  pu: obj.pu / DIVIDER,
                  tb: obj.tb / DIVIDER
                }
              }),
          });
        })
        .catch((err) => {
          reject(err);
        });
  })
);

const findNetProfits = (year) => (
  new Promise((resolve, reject) => {
      models.NetProfit.findAll({
          where: {
            year: year || MINIMUM_YEAR,
          },
          order: ['year', 'month'],
        })
        .then((netProfits) => {
          resolve({
              key: NET_PROFITS_KEY,
              result: netProfits.map(obj => {
                return {
                  month: obj.month,
                  rkap: obj.rkap / DIVIDER,
                  ra: obj.ra / DIVIDER,
                  ri: obj.ri / DIVIDER,
                  prognosa: obj.prognosa / DIVIDER,
                }
              }),
          });
        })
        .catch((err) => {
          reject(err);
        });
  })
);

const findEpcSum = (year, month) => (
  new Promise((resolve, reject) => {
    models.Project.findAll({
      where: {
        projectType: 1,
      },
    })
    .then((projects) => {
      let projectIds = projects.map((o) => {
        return o.id;
      });

      models.ProjectProgress.findAll({
        where: {
          year: year || MINIMUM_YEAR,
          ProjectId: { $in: projectIds },
        },
        attributes: ['month', [sequelize.fn('sum', sequelize.col('riProgress')), 'riSum']],
        group : ['month'],
        raw: true,
        order: ['month']
      })
      .then((riSums) => {
        resolve({
          key: EPC_SUMS_KEY,
          result: riSums.map(obj => {
            return {
              month: obj.month,
              riSum: obj.riSum / DIVIDER,
            }
          }),
        });
      }).catch((err) => {
        reject(err);
      });
      
    });
  })
);

exports.findByMonthYear = function findByMonthYear(req, res) {
    const { month, year } = req.query;
    let promises = [];
    promises.push(findOmzets(year));
    promises.push(findSales(year));
    promises.push(findCredits(year));
    promises.push(findNetProfits(year));
    promises.push(findEpcSum(year));
    Promise.all(promises)
    .then((results) => {
        const homeData = {};
        const omzets = results.find(o => o.key === OMZETS_KEY);
        const sales = results.find(o => o.key === SALES_KEY);
        const credits = results.find(o => o.key === CREDITS_KEY);
        const netProfits = results.find(o => o.key === NET_PROFITS_KEY);
        const epcSums = results.find(o => o.key === EPC_SUMS_KEY);
        homeData['omzets'] = omzets.result;
        homeData['sales'] = sales.result;
        homeData['credits'] = credits.result;
        homeData['netProfits'] = netProfits.result;
        homeData['epcSums'] = epcSums.result;
        console.log('------->');
        console.log(homeData);
        
        res.json(homeData);
    })
    .catch((err) => {
        sendError(err, res);
    });
    
};
