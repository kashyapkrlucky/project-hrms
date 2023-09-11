
const express = require('express');
const router = express.Router();

const controller = require('../controllers/message');

router.post('/send', controller.send);

router.get('/threads/:empId', controller.threads);

router.post('/list', controller.list);

module.exports = router;