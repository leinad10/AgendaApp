const express = require('express');
const { route } = require('../app');
const controller = require('../controllers/users');
const router = express.Router();
const path = 'users'

router.get(
    `/api/${path}`,
    controller.getData
);
router.post(
    `/api/${path}`,
    controller.insertData
);
module.exports = router