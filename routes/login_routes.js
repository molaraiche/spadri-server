const router = require('express').Router();

const { signup, login } = require('../controller/users_controller');

router.post('/login', login);
router.post('/register', signup);

module.exports = router;
