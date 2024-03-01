const router = require('express').Router();

const { adminSignUp, adminLogin } = require('../controller/admin_controller');

router.post('/admin', adminLogin);
router.post('/signup', adminSignUp);

module.exports = router;
