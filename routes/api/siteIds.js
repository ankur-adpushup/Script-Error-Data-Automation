const express = require('express');
const router = express.Router();
const siteIdsController = require('../../controllers/siteIds');

router.get('/', siteIdsController.getSiteIds);
router.post('/append', siteIdsController.append);
router.post('/append-force', siteIdsController.appendForce);
router.post('/remove-force', siteIdsController.removeForce);

module.exports = router;
