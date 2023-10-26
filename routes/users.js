const router = require('express').Router();
const { getMe, updateUser, getUserById } = require('../controllers/users');
const { userIdValidator, updateUserValidator } = require('../utils/validators/userValidator');

router.get('/me', getMe);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
