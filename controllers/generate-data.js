const catchAsync = require('../catchAsync');
const CustomError = require('../error/custom-error');
const schedule = require('node-schedule');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const { formatDate, rootDir } = require('../utils');
const path = require('path');
const { generateMetaData } = require('../helpers/generate-data');

module.exports = {
  // getSpecificError: catchAsync(async (req, res) => {
  //   const { errorMessage, mode } = req.body;
  //   if (!errorMessage || !mode)
  //     throw new CustomError('Error Message or mode is missing!', 400);
  //   if (mode !== 'WEEKLY' && mode !== 'CUSTOM')
  //     throw new CustomError('Wrong Mode provided!', 400);
  //   const filePath = path.join(rootDir, `/tmp/${mode}-entire-data.json`);
  //   let entireData = fs.readFileSync(filePath, {
  //     encoding: 'utf8',
  //     flag: 'r',
  //   });
  //   if (!entireData) throw new CustomError("Could'nt read file!", 500);
  //   entireData = JSON.parse(entireData);
  //   const resData = [];
  //   for (let row of entireData) {
  //     row.logs = JSON.parse(row.logs);
  //     row.logs = row.logs.filter((log) => log.message === errorMessage);
  //     if (row.logs.length !== 0) resData.push(row);
  //   }
  //   const csv = new ObjectsToCsv(resData);
  //   // Save to file:
  //   await csv.toDisk(path.join(rootDir, '/tmp/resData.csv'));
  //   return res.status(200).sendFile(path.join(rootDir, '/tmp/resData.csv'));
  // }),
  // saveEntireData: catchAsync(async (req, res) => {
  //   let { jsonData, mode } = req.body;
  //   if (!jsonData || !mode)
  //     throw new CustomError('jsonData or mode missing!', 400);
  //   if (mode !== 'WEEKLY' && mode !== 'CUSTOM')
  //     throw new CustomError('Wrong Mode provided!', 400);
  //   jsonData = JSON.stringify(jsonData);
  //   const filePath = path.join(rootDir, `/tmp/${mode}-entire-data.json`);
  //   fs.writeFile(filePath, jsonData, (err) => {
  //     if (err) {
  //       throw new CustomError('Error occured while saving the file!', 500);
  //     } else {
  //       return res.status(200).send('FILE SAVED');
  //     }
  //   });
  // }),
  // manual: catchAsync(async (req, res) => {
  //   //generate manual meta data
  //   let { startDate, endDate, mode, event } = req.body;
  //   if (!startDate || !endDate || !mode || !event)
  //     throw new CustomError(
  //       'Details missing to generate Data needed : { startDate,endDate,mode,event }',
  //       400
  //     );
  //   if (mode !== 'WEEKLY' && mode !== 'CUSTOM')
  //     throw new CustomError('Wrong mode provided!', 400);
  //   const notebookParams = {
  //     start_date: startDate,
  //     end_date: endDate,
  //     siteIds: (await getSiteIdsInRange(startDate, endDate)).join(','),
  //     event: event,
  //     mode: mode, //mode  = 'WEEKLY' | 'CUSTOM'
  //   };
  //   const result = await generateMetaData(notebookParams);
  //   if (result.status === 200)
  //     return res.status(result.status).json(result.data);
  //   throw new CustomError('Some Error occured in Job run!', 500);
  // }),
};
