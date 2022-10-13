const { database } = require('../database');
const { incrementDate, formatDate } = require('../utils');

//removes Duplicates from the array
function removeDuplcatesInArray(arr) {
  return Array.from(new Set(arr));
}

//binary search implementation to get row by date
function getRowByDate(date, rows) {
  date = new Date(date).getTime();
  let l = 0,
    h = rows.length - 1;
  if (rows.length === 0) return null;
  if (date === new Date(rows[h].date).getTime()) return rows[h];
  while (l < h) {
    let mid = Math.floor((l + h) / 2);
    let midDate = new Date(rows[mid].date).getTime();
    if (midDate === date) {
      console.log('Record already Exists!');
      return rows[mid];
    } else if (date < midDate) h = mid - 1;
    else l = mid + 1;
  }
  console.log("Record does'nt exist!");
  return null;
}

//Appends siteIds to respective rows, treats date as the row id ( If row is present then appends it, else creates a new row with the respective date )
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

//this function returns all the siteIds in Range of startDate and endDate
async function getSiteIdsInRange(startDate, endDate) {
  const rows = await database.instance.getRows();
  //startDate must be <= endData
  if (new Date(startDate).getTime() > new Date(endDate).getTime()) return [];
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
