const catchAsync = require('../catchAsync');
const CustomError = require('../error/custom-error');
const { database } = require('../database');
const { formatDate, removeDuplcatesInArray } = require('../utils');

const { appendSiteIds, getSiteIdsInRange } = require('../helpers/siteIds');

module.exports = {
  getSiteIds: catchAsync(async (req, res) => {
    const { content } = await database.collection.get('script-error-data');
    if (!content) throw new CustomError('No Document Found!', 500);
    const { startDate, endDate } = req.query;
    console.log(startDate, endDate);
    if (!content) throw new CustomError('No Document Found!', 500);
    return res.status(200).json(getSiteIdsInRange(content, startDate, endDate));
  }),
  append: catchAsync(async (req, res) => {
    const { content } = await database.collection.get('script-error-data');
    if (!content) throw new CustomError('No Document Found!', 500);
    const { alerts } = req.body;
    let curDate = formatDate(new Date());
    let siteIds = [];
    for (let alert of alerts) {
      if (alert?.labels?.siteId) siteIds.push(alert?.labels?.siteId);
    }
    if (siteIds.length === 0) throw new CustomError('siteIds empty!', 400);
    siteIds = removeDuplcatesInArray(siteIds);
    appendSiteIds(content, curDate, siteIds);
    const result = await database.collection.upsert(
      'script-error-data',
      content
    );
    return res.status(200).json(result);
  }),
  appendForce: catchAsync(async (req, res) => {
    //WARNING : this controller is only used for Testing
    const { content } = await database.collection.get('script-error-data');
    if (!content) throw new CustomError('No Document Found!', 500);
    let { date, siteIds } = req.body; // date format is 2022-08-11 => yyyy-mm-dd
    if (!siteIds || !date)
      throw new CustomError('date or siteIds missing!', 400);
    siteIds = removeDuplcatesInArray(siteIds);
    appendSiteIds(content, date, siteIds);
    const result = await database.collection.upsert(
      'script-error-data',
      content
    );
    return res.status(200).json(result);
  }),
  removeForce: catchAsync(async (req, res) => {
    // //WARNING : this controller is only used for Testing
    // const { ids } = req.body;
    // if (!ids) throw new CustomError('No siteIds found', 400);
    // for (let id of ids) siteIds.remove(id);
    // return res.status(200).send('SiteIds removed!');
  }),
};
