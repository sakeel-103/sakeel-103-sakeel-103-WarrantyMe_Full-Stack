const express = require('express');
const router = express.Router();
const { getLetters, createLetter, updateLetter } = require('../controllers/letterController');
const checkJwt = require('../middleware/authMiddleware');
router.use(checkJwt);
router.get('/', getLetters);
router.post('/', createLetter);
router.put('/:id', updateLetter);

module.exports = router;