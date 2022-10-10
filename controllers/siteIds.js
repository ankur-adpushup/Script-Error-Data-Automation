const catchAsync = require('../catchAsync');
const CustomError = require('../error/custom-error');
const schedule = require('node-schedule');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const { formatDate, generateMetaData } = require('../utils');
const path = require('path');
const { siteIds } = require('../database/siteIds');

module.exports = {
  getSiteIds: catchAsync(async (req, res) => {
    return res.status(200).json(Array.from(siteIds));
  }),
  append: catchAsync(async (req, res) => {
    const { alerts } = req.body;
    if (!alerts?.labels?.siteIds)
      throw new CustomError('No SiteIds found!', 500);
    for (let alert of alerts) {
      siteIds.add(alert?.labels?.siteId);
    }
    return res.status(200).send('SiteIds appended');
  }),
  appendForce: catchAsync(async (req, res) => {
    const { ids } = req.body;
    if (!ids) throw new CustomError('No siteIds found', 400);
    for (let id of ids) siteIds.add(id);
    return res.status(200).send('SiteIds appended!');
  }),
  removeForce: catchAsync(async (req, res) => {
    const { ids } = req.body;
    if (!ids) throw new CustomError('No siteIds found', 400);
    for (let id of ids) siteIds.remove(id);
    return res.status(200).send('SiteIds removed!');
  }),
};
