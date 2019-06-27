const models = require('../models');

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

const OMZETS_KEY = 'OMZETS';
const SALES_KEY = 'SALES';

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
                result: omzets,
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
            result: sales,
        });
      })
      .catch((err) => {
        reject(err);
      });
    })
);

exports.findByMonthYear = function findByMonthYear(req, res) {

    const { month, year } = req.query;
    let promises = [];
    promises.push(findOmzets(year));
    promises.push(findSales(year));
    Promise.all(promises)
    .then((results) => {
        const homeData = {};
        const omzets = results.find(o => o.key === OMZETS_KEY);
        const sales = results.find(o => o.key === SALES_KEY);
        homeData['omzets'] = omzets.result;
        homeData['sales'] = sales.result;
        console.log('------->');
        console.log(homeData);
        
        res.json(homeData);
    })
    .catch((err) => {
        sendError(err, res);
    });
    
};
