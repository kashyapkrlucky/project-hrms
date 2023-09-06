const express = require('express');
const router = express.Router();

const controller = require('../controllers/task');

router.get('/:empId', controller.list);

router.post('/add', controller.addTask);

router.put('/update', controller.updateTask);

router.delete('/delete/:id', controller.deleteTask);

module.exports = router;