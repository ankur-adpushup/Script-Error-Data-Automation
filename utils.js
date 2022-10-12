const axios = require('axios');
require('dotenv').config();

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function incrementDate(date_str, incrementor) {
  var parts = date_str.split('-');
  var dt = new Date(
    parseInt(parts[0], 10), // year
    parseInt(parts[1], 10) - 1, // month (starts with 0)
    parseInt(parts[2], 10) // date
  );
  dt.setTime(dt.getTime() + incrementor * 86400000);
  parts[0] = '' + dt.getFullYear();
  parts[1] = '' + (dt.getMonth() + 1);
  if (parts[1].length < 2) {
    parts[1] = '0' + parts[1];
  }
  parts[2] = '' + dt.getDate();
  if (parts[2].length < 2) {
    parts[2] = '0' + parts[2];
  }
  return parts.join('-');
}

const rootDir = __dirname;
module.exports = { formatDate, rootDir, incrementDate };
