const express = require('express');
const router = express.Router();

const controller = require('../controllers/leave');

router.post('/add/balance', controller.addLeaveBalance);

router.get('/balance/:employee', controller.getLeaveBalance);

router.get('/my-leaves/:employee', controller.getMyLeaves);

router.get('/approval/:employee', controller.getApprovalLeaves);

router.post('/my-leaves/add', controller.addMyLeave);

router.post('/update/status', controller.updateStatus);

module.exports = router;