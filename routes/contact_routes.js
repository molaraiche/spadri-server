const router = require('express').Router();
const sendEmail = require('../controller/contact_controller');

router.post('/send', sendEmail);

module.exports = router;
