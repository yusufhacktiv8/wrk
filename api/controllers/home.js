const sequelize = require("sequelize");
const models = require("../models");
const { Op } = sequelize;

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res
    .status(500)
    .send(`Error while doing operation: ${err.name}, ${err.message}`);
};

const OMZETS_KEY = "OMZETS";
const SALES_KEY = "SALES";
const CREDITS_KEY = "CREDITS";
const NET_PROFITS_KEY = "NET_PROFITS";
const EPC_SUMS_KEY = "EPC_SUMS";
const OM_SUMS_KEY = "OM_SUMS";
const SCORE_SUMS_KEY = "SCORE_SUMS";

const DIVIDER = 1000;

const findOmzets = (year) =>
  new Promise((resolve, reject) => {
    models.Omzet.findAll({
      where: {
        year: year || MINIMUM_YEAR,
      },
      order: ["year", "month"],
    })
      .then((omzets) => {
        resolve({
          key: OMZETS_KEY,
          result: omzets.map((obj) => {
            return {
              month: obj.month,
              plan: obj.plan / DIVIDER,
              actual: obj.actual / DIVIDER,
              prognosa: obj.prognosa / DIVIDER,
            };
          }),
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

const findSales = (year) =>
  new Promise((resolve, reject) => {
    models.Sales.findAll({
      where: {
        year: year || MINIMUM_YEAR,
      },
      order: ["year", "month"],
    })
      .then((sales) => {
        resolve({
          key: SALES_KEY,
          result: sales.map((obj) => {
            return {
              month: obj.month,
              plan: obj.plan / DIVIDER,
              actual: obj.actual / DIVIDER,
              prognosa: obj.prognosa / DIVIDER,
            };
          }),
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

const findCredits = (year) =>
  new Promise((resolve, reject) => {
    models.Credit.findAll({
      where: {
        year: year || MINIMUM_YEAR,
      },
      order: ["year", "month"],
    })
      .then((credits) => {
        resolve({
          key: CREDITS_KEY,
          result: credits.map((obj) => {
            return {
              month: obj.month,
              pu: obj.pu / DIVIDER,
              tb: obj.tb / DIVIDER,
            };
          }),
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

const findNetProfits = (year) =>
  new Promise((resolve, reject) => {
    models.NetProfit.findAll({
      where: {
        year: year || MINIMUM_YEAR,
      },
      order: ["year", "month"],
    })
      .then((netProfits) => {
        resolve({
          key: NET_PROFITS_KEY,
          result: netProfits.map((obj) => {
            return {
              month: obj.month,
              rkap: obj.rkap / DIVIDER,
              ra: obj.ra / DIVIDER,
              ri: obj.ri / DIVIDER,
              prognosa: obj.prognosa / DIVIDER,
            };
          }),
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

const findEpcSum = (year, month) =>
  new Promise((resolve, reject) => {
    models.Project.findAll({
      where: {
        projectType: 1,
      },
    }).then((projects) => {
      let projectIds = projects.map((o) => {
        return o.id;
      });

      models.ProjectProgress.findAll({
        where: {
          year: year || MINIMUM_YEAR,
          ProjectId: { [Op.in]: projectIds },
        },
        attributes: [
          "month",
          [sequelize.fn("sum", sequelize.col("ok")), "riSum"],
        ],
        group: ["month"],
        raw: true,
        order: ["month"],
      })
        .then((riSums) => {
          resolve({
            key: EPC_SUMS_KEY,
            result: riSums.map((obj) => {
              return {
                month: obj.month,
                riSum: obj.riSum / DIVIDER,
              };
            }),
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

const findOmSum = (year, month) =>
  new Promise((resolve, reject) => {
    models.Project.findAll({
      where: {
        projectType: 2,
      },
    }).then((projects) => {
      let projectIds = projects.map((o) => {
        return o.id;
      });

      models.ProjectProgress.findAll({
        where: {
          year: year || MINIMUM_YEAR,
          ProjectId: { $in: projectIds },
        },
        attributes: [
          "month",
          [sequelize.fn("sum", sequelize.col("ok")), "riSum"],
        ],
        group: ["month"],
        raw: true,
        order: ["month"],
      })
        .then((riSums) => {
          resolve({
            key: OM_SUMS_KEY,
            result: riSums.map((obj) => {
              return {
                month: obj.month,
                riSum: obj.riSum / DIVIDER,
              };
            }),
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

const findScoreSum = (year, month) =>
  new Promise((resolve, reject) => {
    models.Score.findAll({
      where: {
        year: year || MINIMUM_YEAR,
      },
      attributes: [
        "month",
        "scoreType",
        [sequelize.fn("sum", sequelize.col("raScore")), "raScoreSum"],
        [sequelize.fn("sum", sequelize.col("riScore")), "riScoreSum"],
      ],
      group: ["month", "scoreType"],
      raw: true,
      order: ["month", "scoreType"],
    })
      .then((scoreSums) => {
        let flattenScoreSums = [];
        for (let i = 0; i < scoreSums.length; i += 1) {
          let scoreSum = scoreSums[i];
          const scoreSumMonth = scoreSum.month;
          const scoreSumType = scoreSum.scoreType;
          const raScoreSum = scoreSum.raScoreSum;
          const riScoreSum = scoreSum.riScoreSum;
          let flattenScoreSum = flattenScoreSums.find(
            (obj) => obj.month === scoreSumMonth
          );

          if (!flattenScoreSum) {
            flattenScoreSum = {
              month: scoreSumMonth,
              qmslRaScoreSum: 0,
              qmslRiScoreSum: 0,
              sheRaScoreSum: 0,
              sheRiScoreSum: 0,
              r5RaScoreSum: 0,
              r5RiScoreSum: 0,
            };
            flattenScoreSums.push(flattenScoreSum);
          }
          switch (scoreSumType) {
            case 1:
              flattenScoreSum.qmslRaScoreSum = raScoreSum;
              flattenScoreSum.qmslRiScoreSum = riScoreSum;
              break;
            case 2:
              flattenScoreSum.sheRaScoreSum = raScoreSum;
              flattenScoreSum.sheRiScoreSum = riScoreSum;
              break;
            case 3:
              flattenScoreSum.r5RaScoreSum = raScoreSum;
              flattenScoreSum.r5RiScoreSum = riScoreSum;
              break;
          }
        }

        resolve({
          key: SCORE_SUMS_KEY,
          result: flattenScoreSums.map((obj) => {
            return {
              month: obj.month,
              qmslRaScoreSum: obj.qmslRaScoreSum / DIVIDER,
              qmslRiScoreSum: obj.qmslRiScoreSum / DIVIDER,
              sheRaScoreSum: obj.sheRaScoreSum / DIVIDER,
              sheRiScoreSum: obj.sheRiScoreSum / DIVIDER,
              r5RaScoreSum: obj.r5RaScoreSum / DIVIDER,
              r5RiScoreSum: obj.r5RiScoreSum / DIVIDER,
            };
          }),
        });
      })
      .catch((err) => {
        reject(err);
      });
  });

exports.findByMonthYear = function findByMonthYear(req, res) {
  const { month, year } = req.query;
  let promises = [];
  promises.push(findOmzets(year));
  promises.push(findSales(year));
  promises.push(findCredits(year));
  promises.push(findNetProfits(year));
  promises.push(findEpcSum(year));
  promises.push(findOmSum(year));
  promises.push(findScoreSum(year));
  Promise.all(promises)
    .then((results) => {
      const homeData = {};
      const omzets = results.find((o) => o.key === OMZETS_KEY);
      const sales = results.find((o) => o.key === SALES_KEY);
      const credits = results.find((o) => o.key === CREDITS_KEY);
      const netProfits = results.find((o) => o.key === NET_PROFITS_KEY);
      const epcSums = results.find((o) => o.key === EPC_SUMS_KEY);
      const omSums = results.find((o) => o.key === OM_SUMS_KEY);
      const scoreSums = results.find((o) => o.key === SCORE_SUMS_KEY);
      homeData["omzets"] = omzets.result;
      homeData["sales"] = sales.result;
      homeData["credits"] = credits.result;
      homeData["netProfits"] = netProfits.result;
      homeData["epcSums"] = epcSums.result;
      homeData["omSums"] = omSums.result;
      homeData["scoreSums"] = scoreSums.result;

      res.json(homeData);
    })
    .catch((err) => {
      sendError(err, res);
    });
};
