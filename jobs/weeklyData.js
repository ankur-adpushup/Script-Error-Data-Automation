const schedule = require('node-schedule');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const { formatDate, incrementDate } = require('../utils');
const { generateMetaData } = require('../helpers/generate-data');
const path = require('path');
const { getSiteIdsInRange } = require('../helpers/siteIds');
const { database } = require('../database');

async function weeklyJob() {
  console.log('Started job');
  const job = schedule.scheduleJob('4 5 * * 0', async function () {
    try {
      const { content } = await database.collection.get('script-error-data');
      const endDate = formatDate(new Date());
      const startDate = formatDate(new Date().setDate(startDate.getDate() - 7));
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
