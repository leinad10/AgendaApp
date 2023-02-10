const express = require('express');
const { route } = require('../app');
const controller = require('../controllers/verify');
const router = express.Router();
const path = 'verify'

router.put(
    `/api/${path}`,
    controller.changeData
);

module.exports = router