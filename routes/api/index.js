const express = require('express');
const siteIdsRoutes = require('./siteIds');
const router = express.Router();

router.use('/siteIds', siteIdsRoutes);

module.exports = router;
