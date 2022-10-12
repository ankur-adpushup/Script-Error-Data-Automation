const { GoogleSpreadsheet } = require('google-spreadsheet');
// const creds = require('../service-account.json');
require('dotenv').config();
// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
database = {
  instance: {},
  init: async function () {
    try {
      // await doc.useServiceAccountAuth(creds);
      //Intialize auth
      // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
      await doc.useServiceAccountAuth({
        // env var values are copied from service account credentials generated by google
        // see "Authentication" section in docs for more info
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
      });

      // example using impersonation - NOTE: your service account must have "domain-wide delegation" enabled
      // see https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
      // await doc.useServiceAccountAuth(
      //   creds,
      //   'script-error-alerts-database-s@script-error-alerts-database.iam.gserviceaccount.com'
      // );

      await doc.loadInfo(); // loads document properties and worksheets
      console.log('title is : ', doc.title);
      this.instance = doc.sheetsByIndex[0];
    } catch (err) {
      console.log('OOPS ERROR  : ', err);
    }
  },
};

module.exports = { database };
