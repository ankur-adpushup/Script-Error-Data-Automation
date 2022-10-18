const {
  incrementDate,
  formatDate,
  removeDuplcatesInArray,
} = require('../utils');

//Appends siteIds to respective rows, treats date as the row id ( If row is present then appends it, else creates a new row with the respective date )
function appendSiteIds(doc, date, siteIds) {
  if (doc[date]) {
    //date exists!
    doc[date] = [...doc[date], ...siteIds];
  } else {
    //date does'nt exist!
    doc[date] = [...siteIds];
  }
  doc[date] = removeDuplcatesInArray(doc[date]);
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
