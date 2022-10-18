const schedule = require('node-schedule');

const { formatDate, incrementDate } = require('../utils');
const { generateMetaData } = require('../helpers/generate-data');
const { getSiteIdsInRange } = require('../helpers/siteIds');
const { database } = require('../database');

async function weeklyJob() {
  console.log('Started job');
  const job = schedule.scheduleJob('20 23 * * 0', async function () {
    try {
      const endDate = formatDate(new Date());
      const startDate = incrementDate(endDate, -6);
      console.log('JOb triggered!', startDate, ' ', endDate);
      const { content } = await database.collection.get('script-error-data');
      const notebookParams = {
        start_date: startDate,
        end_date: endDate,
        siteIds: getSiteIdsInRange(content, startDate, endDate).join(','), //always atleast sends an empty array
        event: 'ADP_ERROR',
        mode: 'WEEKLY', //mode  = 'WEEKLY' | 'CUSTOM'
      };
      generateMetaData(notebookParams);
    } catch (err) {
      console.log('ERROR IN JOB : ', err);
    }
  });
}

module.exports = { weeklyJob };
