const catchAsync = require('../catchAsync');
const CustomError = require('../error/custom-error');
const schedule = require('node-schedule');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const { formatDate } = require('../utils');
const path = require('path');
const { database } = require('../database');
const {
  removeDuplcatesInArray,
  appendSiteIds,
  getRowByDate,
  getSiteIdsInRange,
} = require('../helpers/siteIds');

module.exports = {
  getSiteIds: catchAsync(async (req, res) => {
    return res
      .status(200)
      .json(await getSiteIdsInRange('2022-10-05', '2022-10-05'));
  }),
  append: catchAsync(async (req, res) => {
    const { alerts } = req.body;
    let curDate = formatDate(new Date());
    let siteIds = [];
    for (let alert of alerts) {
      if (alert?.labels?.siteId) siteIds.push(alert?.labels?.siteId);
    }
    if (siteIds.length === 0) throw new CustomError('siteIds empty!', 400);
    siteIds = removeDuplcatesInArray(siteIds);
    appendSiteIds(curDate, siteIds);
    return res.status(200).send('SiteIds appended');
  }),
  appendForce: catchAsync(async (req, res) => {
    //WARNING : this controller is only used for Testing
    const { date, siteIds } = req.body; // date format is 2022-08-11 => yyyy-mm-dd
    if (!siteIds) throw new CustomError('No siteIds found', 400);
    appendSiteIds(date, siteIds);
    res.status(200).send('siteIds force appended!');
  }),
  removeForce: catchAsync(async (req, res) => {
    //WARNING : this controller is only used for Testing
    const { ids } = req.body;
    if (!ids) throw new CustomError('No siteIds found', 400);
    for (let id of ids) siteIds.remove(id);
    return res.status(200).send('SiteIds removed!');
  }),
};
