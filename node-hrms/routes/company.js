const express = require('express');
const router = express.Router();

const controller = require('../controllers/company');
const { excelUploads } = require('../middlewares/uploadfile');

router.get('/data', controller.getCompanyData);

router.post('/designations/add', controller.addDesignation);

router.post('/department/add', controller.addDepartment);

router.post('/team/add', controller.addTeams);

router.put('/team/update/:id', controller.updateTeams);

router.get('/departments', controller.departments);

router.get('/designations', controller.designations);

router.get('/teams', controller.teams);

router.post('/holidays/upload', excelUploads.single('file'), controller.uploadHolidays);

router.get('/holidays', controller.getHolidays);


router.get('/attendance/:employee', controller.getAttendance);

router.post('/attendance/add', controller.addAttendance);

router.put('/attendance/update', controller.updateAttendance);

router.get('/attendance-all', controller.getTotalAttendance);

module.exports = router;