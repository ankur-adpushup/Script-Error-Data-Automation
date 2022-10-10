const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const { weeklyJob } = require('./jobs/weeklyData');
require('dotenv').config();
const app = express();
global.__basedir = __dirname;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', routes);

weeklyJob();
app.use((err, req, res, next) => {
  if (err) {
    console.log('ERROR MIDDLEWARE : ', err);
    res.status(err.statusCode).send(err.message);
  } else res.status(500).send('Server Error Occured!');
});

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
