const express = require('express');
const router = express.Router();

const controller = require('../controllers/job');


router.get('/info/:id', controller.getById);

router.get('/list', controller.list);

router.post('/add', controller.add);

router.put('/update', controller.update);

router.delete('/delete/:id', controller.delete);

module.exports = router;