const axios = require('axios');

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const generateMetaData = async (notebookParams) => {
  try {
    const jobPayload = {
      job_id: 122946736212897,
      notebook_params: notebookParams,
    };
    const res = await axios.post(
      'https://adb-3635891678787305.5.azuredatabricks.net/api/2.0/jobs/run-now',
      jobPayload,
      {
        headers: {
          Authorization: 'Bearer dapid6e27b0a93263571021800d2906ee049-2',
        },
      }
    );
    console.log(res);
  } catch (err) {
    console.log('OOPS an error occured in generateWeeklyData : ', err);
  }
};

module.exports = { formatDate, generateMetaData };
