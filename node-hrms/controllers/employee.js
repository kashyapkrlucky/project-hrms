// Required Imports
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Employee = require('../models/Employee');
const { success, error, unauthorize, duplicate } = require('../utils/responses');

const Constants = require('../utils/constants');
const Profile = require("../models/Profile");

exports.create = async (req, res, next) => {
    const { email, ...user } = req.body;
    const empExists = await Employee.findOne({ email }).select({ _id: true });
    if (empExists === null) {
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash('12345678', salt);
        const employee = new Employee({
            ...user, email, password: hashedPass
        });
        employee
            .save()
            .then(doc => success(res, doc._id, Constants.RecordsCreated))
            .catch(err => error(res, err, Constants.ErrorCreating));
    } else {
        duplicate(res, "", Constants.EmailRegistered);
    }
}

// Exported Controller to get user signed in
exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    // if email exists
    const [isExist] = await Employee.find({ email });
    if (isExist && password) {
        // Validate Password
        const verifyPassword = await bcryptjs.compareSync(password, isExist.password);
        if (verifyPassword) {
            // Generate and Send Token
            let signOptions = { issuer: Constants.AppName, expiresIn: "23h" };
            const authToken = jwt.sign({
                _id: isExist._id,
                firstName: isExist.firstName,
                lastName: isExist.lastName,
                email: isExist.email,
                avatar: isExist.avatar,
                type: 'employee'
            }, process.env.SECRET, signOptions);
            success(res, authToken, Constants.Authenticated);
        } else {
            unauthorize(res, "", Constants.InvalidEmailPassword);
        }
    } else {
        unauthorize(res, "", Constants.InvalidEmailPassword);
    }
};

exports.list = (req, res, next) => {
    Employee
        .find({})
        .sort({ createdAt: 'desc' })
        .select({ firstName: 1, lastName: 1, email: 1, mobile: 1, avatar: 1, empCode: 1, designation: 1 })
        .populate({ path: 'designation', select: { name: true } })
        // .populate({ path: 'team', select: { name: true } })
        // .populate({ path: 'department', select: { name: true } })
        .then(docs => success(res, docs, Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.profile = (req, res, next) => {
    Employee
        .findById(req.params.id)
        .select({ password: 0, __v: 0 })
        .populate({
            path: 'reportingTo',
            select: { firstName: 1, lastName: 1, avatar: 1 }
        })
        .then(doc => success(res, doc, Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.update = (req, res, next) => {
    const { id, ...others } = req.body;
    Employee
        .findByIdAndUpdate(id, others, { upsert: true })
        .then(doc => success(res, '', Constants.RecordsUpdated))
        .catch(err => error(res, err, Constants.ErrorUpdating));
};

exports.updateProfile = async (req, res, next) => {
    const { id, avatar, ...others } = req.body;
    await Profile.findOneAndUpdate({ employee: id }, others, { upsert: true });
    Employee
        .findByIdAndUpdate(id, { avatar }, { upsert: true })
        .then(doc => success(res, '', Constants.RecordsUpdated))
        .catch(err => error(res, err, Constants.ErrorUpdating));
};

exports.changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.params;
    const emp = await Employee.findById(id).select({ _id: true, password: true });
    if (emp) {
        const verifyPassword = await bcryptjs.compareSync(currentPassword, emp.password);
        if (verifyPassword) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPass = await bcryptjs.hash(newPassword, salt);
            Employee
                .findByIdAndUpdate(id, { password: hashedPass }, { upsert: true })
                .then(doc => success(res, doc._id, Constants.RecordsUpdated))
                .catch(err => error(res, err, Constants.ErrorUpdating));
        } else {
            error(res, "", Constants.CurrentPasswordWrong);
        }
    } else {
        error(res, "", Constants.InvalidEmailPassword);
    }
};

// Search User 
exports.search = (req, res, next) => {
    const { str } = req.params;
    Employee
        .find({ firstName: new RegExp(str, 'i') })
        .select({ firstName: 1, lastName: 1, avatar: 1, email: 1 })
        .then(docs => success(res, docs, Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}