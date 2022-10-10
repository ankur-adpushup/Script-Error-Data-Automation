const schedule = require('node-schedule');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const { formatDate, generateMetaData } = require('../utils');
const path = require('path');
const { siteIds } = require('../database/siteIds');

function weeklyJob() {
  console.log('Started job');
  const job = schedule.scheduleJob('4 5 * * 0', async function () {
    try {
      const endDate = new Date();
      const startDate = new Date();
      const notebookParams = {
        start_date: formatDate(startDate.setDate(startDate.getDate() - 7)),
        end_date: formatDate(endDate),
        siteIds: Array.from(siteIds).join(','),
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
