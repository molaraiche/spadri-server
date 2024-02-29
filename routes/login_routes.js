const router = require('express').Router();

const { login, signup } = require('../controller/users_controller');

router.post('/login', login);
router.post('/register', signup);
module.exports = login;
