const express = require('express');
const router = express.Router();
const checkJwt = require('../middleware/authMiddleware');
router.get('/user', checkJwt, (req, res) => {
    res.json({
        success: true,
        user: { id: req.auth.payload.sub },
    });
});

module.exports = router;