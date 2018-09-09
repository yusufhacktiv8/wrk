const models = require('../models');

const MINIMUM_YEAR = 2015;

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

const insertOmzet = (year, month, data) => (
  new Promise((resolve, reject) => {
    let plan = 0;
    let actual = 0;
    const externRa1 = data.kontrakDihadapi.pesananTahunLalu.extern.ra || 0;
    const joRa1 = data.kontrakDihadapi.pesananTahunLalu.jo.ra || 0;
    const internRa1 = data.kontrakDihadapi.pesananTahunLalu.intern.ra || 0;

    const externRi1 = data.kontrakDihadapi.pesananTahunLalu.extern.ri || 0;
    const joRi1 = data.kontrakDihadapi.pesananTahunLalu.jo.ri || 0;
    const internRi1 = data.kontrakDihadapi.pesananTahunLalu.intern.ri || 0;

    const externRa2 = data.kontrakDihadapi.pesananBaru.extern.ra || 0;
    const joRa2 = data.kontrakDihadapi.pesananBaru.jo.ra || 0;
    const internRa2 = data.kontrakDihadapi.pesananBaru.intern.ra || 0;

    const externRi2 = data.kontrakDihadapi.pesananBaru.extern.ri || 0;
    const joRi2 = data.kontrakDihadapi.pesananBaru.jo.ri || 0;
    const internRi2 = data.kontrakDihadapi.pesananBaru.intern.ri || 0;

    plan = externRa1 + joRa1 + internRa1 +
            externRa2 + joRa2 + internRa2;
    actual = externRi1 + joRi1 + internRi1 +
            externRi2 + joRi2 + internRi2;

    models.Omzet.destroy(
      {
        where: { year, month },
      })
    .then(() => {
      models.Omzet.create({
        year,
        month,
        plan,
        actual,
      })
      .then((newOmzet) => {
        resolve(newOmzet);
      })
      .catch((err) => {
        reject(err);
      });
    })
    .catch((err) => {
      reject(err);
    });
  })
);

const insertSales = (year, month, data) => (
  new Promise((resolve, reject) => {
    let plan = 0;
    let actual = 0;
    const externRa1 = data.penjualan.pesananTahunLalu.extern.ra || 0;
    const joRa1 = data.penjualan.pesananTahunLalu.jo.ra || 0;
    const internRa1 = data.penjualan.pesananTahunLalu.intern.ra || 0;

    const externRi1 = data.penjualan.pesananTahunLalu.extern.ri || 0;
    const joRi1 = data.penjualan.pesananTahunLalu.jo.ri || 0;
    const internRi1 = data.penjualan.pesananTahunLalu.intern.ri || 0;

    const externRa2 = data.penjualan.pesananBaru.extern.ra || 0;
    const joRa2 = data.penjualan.pesananBaru.jo.ra || 0;
    const internRa2 = data.penjualan.pesananBaru.intern.ra || 0;

    const externRi2 = data.penjualan.pesananBaru.extern.ri || 0;
    const joRi2 = data.penjualan.pesananBaru.jo.ri || 0;
    const internRi2 = data.penjualan.pesananBaru.intern.ri || 0;

    plan = externRa1 + joRa1 + internRa1 +
            externRa2 + joRa2 + internRa2;
    actual = externRi1 + joRi1 + internRi1 +
            externRi2 + joRi2 + internRi2;

    models.Sales.destroy(
      {
        where: { year, month },
      })
    .then(() => {
      models.Sales.create({
        year,
        month,
        plan,
        actual,
      })
      .then((newSales) => {
        resolve(newSales);
      })
      .catch((err) => {
        reject(err);
      });
    })
    .catch((err) => {
      reject(err);
    });
  })
);

const dataReducer = (a, b) => ({
  rkap: (a.rkap || 0) + (b.rkap || 0),
  ra: (a.ra || 0) + (b.ra || 0),
  ri: (a.ri || 0) + (b.ri || 0),
  prognosa: (a.prognosa || 0) + (b.prognosa || 0),
});

const getTotal = data => ({
  rkap: (data.pesananTahunLalu.extern.rkap || 0) +
  (data.pesananTahunLalu.jo.rkap || 0) +
  (data.pesananTahunLalu.intern.rkap || 0) +
  (data.pesananBaru.extern.rkap || 0) +
  (data.pesananBaru.jo.rkap || 0) +
  (data.pesananBaru.intern.rkap || 0),
  ra: (data.pesananTahunLalu.extern.ra || 0) +
  (data.pesananTahunLalu.jo.ra || 0) +
  (data.pesananTahunLalu.intern.ra || 0) +
  (data.pesananBaru.extern.ra || 0) +
  (data.pesananBaru.jo.ra || 0) +
  (data.pesananBaru.intern.ra || 0),
  ri: (data.pesananTahunLalu.extern.ri || 0) +
  (data.pesananTahunLalu.jo.ri || 0) +
  (data.pesananTahunLalu.intern.ri || 0) +
  (data.pesananBaru.extern.ri || 0) +
  (data.pesananBaru.jo.ri || 0) +
  (data.pesananBaru.intern.ri || 0),
  prognosa: (data.pesananTahunLalu.extern.prognosa || 0) +
  (data.pesananTahunLalu.jo.prognosa || 0) +
  (data.pesananTahunLalu.intern.prognosa || 0) +
  (data.pesananBaru.extern.prognosa || 0) +
  (data.pesananBaru.jo.prognosa || 0) +
  (data.pesananBaru.intern.prognosa || 0),
});

const insertNetProfit = (year, month, data) => (
  new Promise((resolve, reject) => {
    const { biayaUsaha, bunga, labaRugiLain, labaKotor, penjualan } = data;

    // result = labaUsaha + bunga + labaRugiLain
    // labaUsaha = biayaUsaha + labaKotorStlhPphFinal
    // labaKotorStlhPphFinal = pphFinal + labaKotor
    // pphFinal = 3% penjualan
    console.log(data);

    const totalPenjualan = getTotal(penjualan);
    const pphFinal = {
      rkap: 0.3 * (totalPenjualan.rkap),
      ra: 0.3 * (totalPenjualan.ra),
      ri: 0.3 * (totalPenjualan.ri),
      prognosa: 0.3 * (totalPenjualan.prognosa),
    };

    const totalLabaKotor = getTotal(labaKotor);
    const labaKotorStlhPphFinal = [pphFinal, totalLabaKotor].reduce(dataReducer);

    const labaUsaha = [biayaUsaha, labaKotorStlhPphFinal].reduce(dataReducer);
    const result = [labaUsaha, bunga, labaRugiLain].reduce(dataReducer);

    models.NetProfit.create({
      year,
      month,
      rkap: result.rkap,
      ra: result.ra,
      ri: result.ri,
      prognosa: result.prognosa,
    })
    .then(() => {
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  })
);

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
  const year = revenueForm.year;
  const month = revenueForm.month;
  const data = revenueForm.hasilUsaha;
  const dataJSON = JSON.stringify(data);
  models.Revenue.create({
    year,
    month,
    data: dataJSON,
  })
  .then((result) => {
    insertOmzet(year, month, data)
    .then(() => {
      insertSales(year, month, data)
      .then(() => {
        insertNetProfit()
        .then(() => {
          res.json(result);
        });
      });
    });
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const revenueForm = req.body;
  const year = revenueForm.year;
  const month = revenueForm.month;
  const data = revenueForm.hasilUsaha;
  const dataJSON = JSON.stringify(data);
  models.Revenue.update(
    {
      year,
      month,
      data: dataJSON,
    },
    {
      where: { id: req.params.revenueId },
    })
  .then((result) => {
    insertOmzet(year, month, data)
    .then(() => {
      insertSales(year, month, data)
      .then(() => {
        insertNetProfit(year, month, data)
        .then(() => {
          res.json(result);
        });
      });
    });
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
