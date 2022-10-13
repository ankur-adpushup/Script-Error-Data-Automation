const express = require('express');
const router = express.Router();
const generateData = require('../../controllers/generate-data');

router.post('/specific-error-data', generateData.getSpecificError);
router.post('/save-entire-data', generateData.saveEntireData);
router.post('/manual', generateData.manual);

module.exports = router;
