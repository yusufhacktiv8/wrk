const Excel = require('exceljs');
const models = require('../models');
const moment = require('moment');
const Constant = require('../Constant');
const Readable = require('stream').Readable;
const UploadProject = require('./upload_project.js');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Upload.findAndCountAll({
    where: {
      // $or: [
      //   { code: { $ilike: searchText } },
      //   { name: { $ilike: searchText } },
      // ],
    },
    limit,
    offset,
    order: ['year', 'month'],
  })
  .then((uploads) => {
    res.json(uploads);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.Upload.findOne({
    where: { id: req.params.uploadId },
  })
  .then((upload) => {
    res.json(upload);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const uploadForm = req.body;
  models.Upload.create(uploadForm)
  .then((upload) => {
    res.json(upload);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const uploadForm = req.body;
  models.Upload.update(
    uploadForm,
    {
      where: { id: req.params.uploadId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Upload.destroy(
    {
      where: { id: req.params.uploadId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

const INIT_WORKSHEET_LABEL = 'Cover';
const HASIL_USAHA_LABEL = 'Hasil Usaha';
const PIUTANG_LABEL = 'Piutang';
const SHEET_TYPE_CELL = 'F5';
const MONTH_CELL = 'F7';
const YEAR_CELL = 'F9';
const PROJECT_CODE_CELL = 'F11';

const OMZET_RA_CELL = 'E7';
const OMZET_RI_CELL = 'E8';
const OMZET_PROGNOSA_CELL = 'E9';
const SALES_RA_CELL = 'F7';
const SALES_RI_CELL = 'F8';
const SALES_PROGNOSA_CELL = 'F9';

const NET_PROFIT_RKAP_CELL = 'O6';
const NET_PROFIT_RA_CELL = 'O7';
const NET_PROFIT_RI_CELL = 'O8';
const NET_PROFIT_PROGNOSA_CELL = 'O9';

const insertUpload = (year, month, sheetType) => (
  new Promise((resolve, reject) => {
    models.Upload.destroy(
      {
        where: { year, month },
      })
    .then(() => {
      models.Upload.create({
        year,
        month,
        sheetType,
      })
      .then((newUpload) => {
        resolve(newUpload);
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

const insertOmzet = (year, month, workbook) => (
  new Promise((resolve, reject) => {
    const worksheet = workbook.getWorksheet(HASIL_USAHA_LABEL);
    let plan = parseFloat(worksheet.getCell(OMZET_RA_CELL).value.result);
    let actual = parseFloat(worksheet.getCell(OMZET_RI_CELL).value.result);
    let prognosa = parseFloat(worksheet.getCell(OMZET_PROGNOSA_CELL).value.result);
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
        prognosa,
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

const insertSales = (year, month, workbook) => (
  new Promise((resolve, reject) => {
    const worksheet = workbook.getWorksheet(HASIL_USAHA_LABEL);
    let plan = parseFloat(worksheet.getCell(SALES_RA_CELL).value.result);
    let actual = parseFloat(worksheet.getCell(SALES_RI_CELL).value.result);
    let prognosa = parseFloat(worksheet.getCell(SALES_PROGNOSA_CELL).value.result);
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
        prognosa,
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

const insertPiutang = (year, workbook) => (
  new Promise((resolve, reject) => {
    const worksheet = workbook.getWorksheet(PIUTANG_LABEL);
    let promises = [];
    var month = 1;
    for (let i = 5; i <= 5 + 12; i += 1) {
      let pu = parseFloat(worksheet.getCell(`C${i}`).value);
      let tb = parseFloat(worksheet.getCell(`D${i}`).value);
      
      if (isNaN(pu) || isNaN(tb)) continue;
      promises.push(new Promise((resolve2, reject2) => {
        models.Credit.create({
          year,
          month,
          pu,
          tb,
        })
        .then((newPiutang) => {
          resolve2(newPiutang);
        })
        .catch((err) => {
          reject2(err);
        });
      }));
      month += 1;
    }
    models.Credit.destroy(
      {
        where: { year },
      })
    .then(() => {
      Promise.all(promises)
        .then(() => {
          resolve();
        });
    })
    .catch((err) => {
      reject(err);
    });
  })
);

const insertNetProfit = (year, month, workbook) => (
  new Promise((resolve, reject) => {
    const worksheet = workbook.getWorksheet(HASIL_USAHA_LABEL);
    let rkap = parseFloat(worksheet.getCell(NET_PROFIT_RKAP_CELL).value.result);
    let plan = parseFloat(worksheet.getCell(NET_PROFIT_RA_CELL).value.result);
    let actual = parseFloat(worksheet.getCell(NET_PROFIT_RI_CELL).value.result);
    let prognosa = parseFloat(worksheet.getCell(NET_PROFIT_PROGNOSA_CELL).value.result);
    models.NetProfit.destroy(
      {
        where: { year, month },
      })
    .then(() => {
      models.NetProfit.create({
        year,
        month,
        rkap,
        ra: plan,
        ri: actual,
        prognosa,
      })
      .then((newNetProfit) => {
        resolve(newNetProfit);
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

exports.processUpload = (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  const docFile = req.files.docFile;

  const workbook = new Excel.Workbook();
  const stream = new Readable();
  stream._read = function noop() {};
  stream.push(docFile.data);
  stream.push(null);
  
  workbook.xlsx.read(stream)
      .then(() => {
        const worksheet = workbook.getWorksheet(INIT_WORKSHEET_LABEL);
        const sheetType = worksheet.getCell(SHEET_TYPE_CELL).value;
        const month = worksheet.getCell(MONTH_CELL).value;
        const year = worksheet.getCell(YEAR_CELL).value;

        console.log('sheetType: ', `'${sheetType}'`);
        
        let promises = [];
        
        promises.push(insertUpload(year, month, sheetType));

        if (sheetType === 'HEAD OFFICE') {
          promises.push(insertOmzet(year, month, workbook));
          promises.push(insertSales(year, month, workbook));
          promises.push(insertPiutang(year, workbook));
          promises.push(insertNetProfit(year, month, workbook));
        } else if (sheetType === 'PROJECT') {
          const projectCode = worksheet.getCell(PROJECT_CODE_CELL).value;
          promises.push(UploadProject.insertProject(year, month, projectCode, workbook));
        }
        
        Promise.all(promises)
        .then(() => {
          res.json({
            result: 'OK',
          });
        });
      })
      .catch((errReadExcel) => {
        res.status(500).send(errReadExcel.message);
      });
};

