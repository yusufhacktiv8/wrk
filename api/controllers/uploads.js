const Excel = require('exceljs');
const models = require('../models');
const moment = require('moment');
const Constant = require('../Constant');
const Readable = require('stream').Readable;

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
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
    limit,
    offset,
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


const MONTH_CELL = 'B3';
const YEAR_CELL = 'C3';

const OMZET_RA_CELL = 'I7';
const OMZET_RI_CELL = 'I8';

const insertOmzet = (year, month, worksheet) => (
  new Promise((resolve, reject) => {
    let plan = parseFloat(worksheet.getCell(OMZET_RA_CELL).value.result);
    let actual = parseFloat(worksheet.getCell(OMZET_RI_CELL).value.result);
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
        const worksheet = workbook.getWorksheet(1);
        const month = worksheet.getCell(MONTH_CELL).value;
        const year = worksheet.getCell(YEAR_CELL).value;
        
        insertOmzet(year, month, worksheet)
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

