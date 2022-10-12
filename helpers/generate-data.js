const axios = require('axios');
require('dotenv').config();

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
          Authorization: `Bearer ${process.env.DATABRICKS_AUTH_TOKEN}`,
        },
      }
    );
    console.log(res);
  } catch (err) {
    console.log('OOPS an error occured in generateWeeklyData : ', err);
  }
};

module.exports = { generateMetaData };
