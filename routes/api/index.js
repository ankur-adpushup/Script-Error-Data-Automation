const express = require('express');
const siteIdsRoutes = require('./siteIds');
const generateDataRoutes = require('./generate-data');
const router = express.Router();

router.use('/siteIds', siteIdsRoutes);
router.use('/generate-data', generateDataRoutes);

module.exports = router;
