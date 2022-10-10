const catchAsync = require('../catchAsync');
const CustomError = require('../error/custom-error');
const schedule = require('node-schedule');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const { formatDate, generateMetaData, rootDir } = require('../utils');
const path = require('path');
const { siteIds } = require('../database/siteIds');

module.exports = {
  getSpecificError: catchAsync(async (req, res) => {
    const { errorMessage, mode } = req.body;
    if (!errorMessage || !mode)
      throw new CustomError('Error Message or mode is missing!', 400);
    if (mode !== 'WEEKLY' && mode !== 'CUSTOM')
      throw new CustomError('Wrong Mode provided!', 400);
    const filePath =
      mode === 'WEEKLY'
        ? path.join(rootDir, '/tmp/weekly-entire-data.json')
        : path.join(rootDir, '/tmp/custom-entire-data.json');
    let entireData = fs.readFileSync(filePath, {
      encoding: 'utf8',
      flag: 'r',
    });
    if (!entireData) throw new CustomError("Could'nt read file!", 500);
    entireData = JSON.parse(entireData);
    const resData = [];
    for (let row of entireData) {
      row.logs = JSON.parse(row.logs);
      row.logs = row.logs.filter((log) => log.message === errorMessage);
      if (row.logs.length !== 0) resData.push(row);
    }
    const csv = new ObjectsToCsv(resData);
    // Save to file:
    await csv.toDisk(path.join(rootDir, '/tmp/resData.csv'));
    return res.status(200).sendFile(path.join(rootDir, '/tmp/resData.csv'));
  }),
  saveEntireData: catchAsync(async (req, res) => {
    let { jsonData, mode } = req.body;
    if (!jsonData || !mode)
      throw new CustomError('jsonData or mode missing!', 400);
    if (mode !== 'WEEKLY' && mode !== 'CUSTOM')
      throw new CustomError('Wrong Mode provided!', 400);
    jsonData = JSON.stringify(jsonData);
    const filePath =
      mode === 'WEEKLY'
        ? path.join(rootDir, '/tmp/weekly-entire-data.json')
        : path.join(rootDir, '/tmp/custom-entire-data.json');
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        throw new CustomError('Error occured while saving the file!', 500);
      } else {
        return res.status(200).send('FILE SAVED');
      }
    });
  }),
};
