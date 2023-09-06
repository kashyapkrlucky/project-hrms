const express = require('express');
const router = express.Router();

const controller = require('../controllers/recruitment');

router.get('/list', controller.list);

router.post('/add', controller.add);

router.put('/update', controller.update);

router.put('/update/status', controller.updateStatus);

router.delete('/delete/:id', controller.delete);

module.exports = router;