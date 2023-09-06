const express = require('express');
const router = express.Router();

const controller = require('../controllers/employee');
const { validate, validateUser } = require('../middlewares/auth');

router.post('/sign-in', controller.signIn);

router.post('/create', controller.create);

router.get('/profile/:id', controller.profile);

router.get('/list', controller.list);

router.put('/update', controller.update);

router.put('/update/profile', controller.updateProfile);

router.put('/change-password/:id', validateUser, controller.changePassword);

router.get('/search/:str', controller.search);

module.exports = router;
