const router = require('express').Router();

const { getUserInfo } = require('../controllers/users');

// todo validation
router.get('/me', getUserInfo);

module.exports = router;
