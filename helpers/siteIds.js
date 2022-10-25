const {
  incrementDate,
  removeDuplcatesInArray,
  formatDate,
} = require('../utils');

//Appends siteIds to respective rows, treats date as the row id ( If row is present then appends it, else creates a new row with the respective date )
function appendSiteIds(doc, date, siteIds) {
  cleanUp(doc);
  if (doc[date]) {
    //date exists!
    doc[date] = [...doc[date], ...siteIds];
  } else {
    //date does'nt exist!
    doc[date] = [...siteIds];
  }
  doc[date] = removeDuplcatesInArray(doc[date]);
}

//cleanup function that cleans key value pairs that are no longer needed ( Only keep key values for the present month! )
function cleanUp(doc) {
  function outOfDate(date) {
    var threshold = new Date();
    threshold.setMonth(threshold.getMonth() - 1);
    return new Date(date).getTime() < threshold;
  }
  for (let date in doc) {
    if (outOfDate(date)) delete doc[date];
  }
}

//this function returns all the siteIds in Range of startDate and endDate
function getSiteIdsInRange(doc, startDate, endDate) {
  if (new Date(startDate).getTime() > new Date(endDate).getTime()) return [];
  let curDate = startDate;
  const dates = [];
  while (curDate != incrementDate(endDate, 1)) {
    dates.push(curDate);
    curDate = incrementDate(curDate, 1);
  }
  const siteIds = [];
  dates.forEach((date) => {
    if (doc && doc[date] && Array.isArray(doc[date]))
      siteIds.push(...doc[date]);
  });
  return removeDuplcatesInArray(siteIds);
}

module.exports = {
  appendSiteIds,
  getSiteIdsInRange,
};
