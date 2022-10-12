const schedule = require('node-schedule');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const { formatDate, incrementDate } = require('../utils');
const { generateMetaData } = require('../helpers/generate-data');
const path = require('path');
const { doc } = require('../database');
const { getSiteIdsInRange } = require('../helpers/siteIds');

async function weeklyJob() {
  console.log('Started job');
  const job = schedule.scheduleJob('4 5 * * 0', async function () {
    try {
      const endDate = formatDate(new Date());
      const startDate = formatDate(new Date().setDate(startDate.getDate() - 7));
      const notebookParams = {
        start_date: startDate,
        end_date: endDate,
        siteIds: await getSiteIdsInRange(startDate, endDate),
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
