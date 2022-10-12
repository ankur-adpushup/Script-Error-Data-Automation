const { database } = require('../database');
const { incrementDate, formatDate } = require('../utils');

function removeDuplcatesInArray(arr) {
  return Array.from(new Set(arr));
}
function getRowByDate(date, rows) {
  //binary search implementation to get row by date
  date = new Date(date).getTime();
  let l = 0,
    h = rows.length - 1;
  if (rows.length === 0) return null;
  if (date === new Date(rows[h].date).getTime()) return rows[h];
  while (l < h) {
    let mid = Math.floor((l + h) / 2);
    let midDate = new Date(rows[mid].date).getTime();
    if (midDate === date) {
      console.log('Updating existing record');
      return rows[mid];
    } else if (date < midDate) h = mid - 1;
    else l = mid + 1;
  }
  console.log('Creating new record');
  return null;
}

async function appendSiteIds(date, siteIds) {
  const rows = await database.instance.getRows();
  let row =
    getRowByDate(date, rows) ||
    (await database.instance.addRow({
      date: date,
      siteIds: JSON.stringify([]),
    }));
  let curSiteIds = JSON.parse(row.siteIds);
  curSiteIds = [...curSiteIds, ...siteIds];
  curSiteIds = removeDuplcatesInArray(curSiteIds);
  row.siteIds = JSON.stringify(curSiteIds);
  row.save();
}

async function getSiteIdsInRange(startDate, endDate) {
  const rows = await database.instance.getRows();
  let siteIds = [];
  let curDate = startDate;
  while (curDate != incrementDate(endDate, 1)) {
    let row = getRowByDate(curDate, rows);
    if (!row) break;
    let ids = JSON.parse(row.siteIds);
    siteIds = [...siteIds, ...ids];
    curDate = incrementDate(curDate, 1);
  }
  return removeDuplcatesInArray(siteIds);
}

module.exports = {
  removeDuplcatesInArray,
  getRowByDate,
  appendSiteIds,
  getSiteIdsInRange,
};
