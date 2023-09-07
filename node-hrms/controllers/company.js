const { Designation, Team, Department, Holiday } = require('../models/Company');
const { success, error } = require('../utils/responses');
const Constants = require('../utils/constants');
const csvToJson = require('csvtojson');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);
const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

exports.getCompanyData = async (req, res, next) => {
    const designations = await Designation
        .find({})
        .sort({ createdAt: 'desc' });
    const teams = await Team
        .find({})
        .sort({ createdAt: 'desc' })
        .populate({ path: 'manager', select: { firstName: 1, lastName: 1, avatar: 1 } })
        .populate({ path: 'department', select: { name: true } });
    const departments = await Department
        .find({})
        .populate({
            path: 'headName',
            select: { firstName: 1, lastName: 1, avatar: 1 }
        })
        .sort({ createdAt: 'desc' });
    success(res, { designations, teams, departments }, Constants.RecordsFound)
}

exports.addDesignation = async (req, res, next) => {
    const { name } = req.body;
    const designation = new Designation({
        name, status: true
    });
    designation
        .save()
        .then(doc => success(res, doc._id, Constants.RecordsCreated))
        .catch(err => error(res, err, Constants.ErrorCreating));
}

exports.addDepartment = async (req, res, next) => {
    const { name, headName } = req.body;
    const department = new Department({
        name, headName, status: true
    });
    department
        .save()
        .then(doc => success(res, doc._id, Constants.RecordsCreated))
        .catch(err => error(res, err, Constants.ErrorCreating));
}

exports.addTeams = async (req, res, next) => {
    const { name, manager, department } = req.body;
    const team = new Team({
        name, manager, department, status: true
    });
    team
        .save()
        .then(doc => success(res, doc._id, Constants.RecordsCreated))
        .catch(err => error(res, err, Constants.ErrorCreating));
}

exports.updateTeams = (req, res, next) => {
    const { name, department, manager } = req.body;
    const { id } = req.params;
    Team
        .findByIdAndUpdate(id, { name, department, manager }, { upsert: true })
        .then(doc => success(res, doc, Constants.RecordsUpdated))
        .catch(err => error(res, err, Constants.ErrorUpdating));
};

exports.designations = (req, res, next) => {
    Designation
        .find({})
        .sort({ createdAt: 'desc' })
        .then(docs => success(res, docs, Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.departments = (req, res, next) => {
    Department
        .find({})
        .sort({ createdAt: 'desc' })
        .populate({
            path: 'headName',
            select: { firstName: 1, lastName: 1, avatar: 1 }
        })
        .then(docs => success(res, docs, Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.teams = (req, res, next) => {
    Team
        .find({})
        .sort({ createdAt: 'desc' })
        .populate({ path: 'manager', select: { firstName: 1, lastName: 1, avatar: 1 } })
        .populate({ path: 'department', select: { name: true } })
        .then(docs => success(res, docs, Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.uploadHolidays = async (req, res, next) => {
    const records = await csvToJson().fromFile(req.file.path);
    const holidays = [];
    for (let i = 0; i < records.length; i++) {
        const elem = records[i];
        holidays.push(elem);
    }
    Holiday.insertMany(holidays)
        .then(() => success(res, 'docs', records.length + Constants.RecordsUploaded))
        .catch(err => error(res, err, Constants.ErrorUploading));
}

exports.getHolidays = (req, res, next) => {
    Holiday
        .find({})
        .sort({ createdAt: 'asc' })
        .then(docs => success(res, docs, Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.getAttendance = (req, res, next) => {
    Attendance
        .findOne({ employee: req.params.employee, inTime: { $gte: new Date().toDateString() } })
        .sort({ createdAt: 'asc' })
        .then(docs => success(res, docs, Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.addAttendance = async (req, res, next) => {
    const { employee, inTime, location } = req.body;
    const attendance = new Attendance({
        employee, inTime, location, isCheckedIn: true
    });
    const inToday = await Attendance.findOne({ employee, inTime: { $gte: new Date().toDateString() } });

    if (inToday) {
        await Attendance.findByIdAndUpdate(inToday._id, { isCheckedIn: true, location }, { upsert: true })
        success(res, '', 'already in today')
    } else {
        attendance
            .save()
            .then(doc => success(res, doc._id, Constants.RecordsCreated))
            .catch(err => error(res, err, Constants.ErrorCreating));
    }
}

exports.updateAttendance = (req, res, next) => {
    const { id, outTime } = req.body;
    Attendance
        .findByIdAndUpdate(id, { outTime, isCheckedIn: false }, { upsert: true })
        .then(doc => success(res, doc, Constants.RecordsUpdated))
        .catch(err => error(res, err, Constants.ErrorUpdating));
};

exports.getTotalAttendance = async (req, res, next) => {
    const empLength = (await Employee.find({})).length;
    Attendance
        .find({ inTime: { $gte: startOfDay, $lt: endOfDay } })
        .select({ employee: 1, inTime: 1, location: 1 })
        .sort({ createdAt: 'asc' })
        .populate({
            path: 'employee',
            select: { firstName: 1, lastName: 1, avatar: 1 }
        })
        .then(docs => success(res, { docs, empLength }, Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}
