var couchbase = require('couchbase');

require('dotenv').config();
const database = {
  bucket: {},
  collection: {},
  connect: async function () {
    try {
      const cluster = await couchbase.connect(process.env.COUCHBASE_HOST, {
        username: process.env.COUCHBASE_USERNAME,
        password: process.env.COUCHBASE_PASSWORD,
      });
      this.bucket = cluster.bucket(process.env.LINK_PREVIEW_BUCKET);
      this.collection = this.bucket.defaultCollection();
    } catch (err) {
      console.log('Database not connected ! : ', err);
    }
  },
};
module.exports = { database };
