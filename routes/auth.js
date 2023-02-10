const express = require('express');
const { route } = require('../app');
const controller = require('../controllers/auth');
const router = express.Router();
const path = 'auth'

router.get(
    `/api/${path}`,
    controller.getData
);
router.post(
    `/api/${path}`,
    controller.insertData
);
module.exports = router