const express = require('express');
const router = express.Router();
const { saveToDrive, getFromDrive } = require('../controllers/driveController');
const checkJwt = require('../middleware/authMiddleware');
router.use(checkJwt);
router.post('/save-to-drive/:id', saveToDrive);
router.get('/drive/:fileId', getFromDrive);

module.exports = router;