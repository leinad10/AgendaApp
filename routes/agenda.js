const express = require('express');
const { route } = require('../app');
const controller = require('../controllers/agenda');
const router = express.Router();
const path = 'agenda'

router.get(
    `/api/${path}`,
    controller.getData
);
router.post(
    `/api/${path}`,
    controller.insertData
);
router.delete(
    `/api/${path}`,
    controller.deletData
)
router.put(
    `/api/${path}`,
    controller.changeData
)
module.exports = router