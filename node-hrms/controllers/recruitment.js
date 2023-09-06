const Recruitment = require("../models/Recruitment");
const { success, error } = require('../utils/responses');

const Constants = require('../utils/constants');
const bcryptjs = require("bcryptjs");
const Employee = require('../models/Employee');
const { transporter, mailOptions } = require('../mailer');
const { LeaveBalance } = require("../models/Leave");

exports.list = (req, res, next) => {
    Recruitment
        .find({})
        .sort({ createdAt: 'desc' })
        .populate({
            path: 'recruiter',
            select: { firstName: 1, lastName: 1, avatar: 1 }
        })
        .populate({
            path: 'jobId',
            select: { profile: true },
            populate: {
                path: 'profile',
                select: { name: true }
            }
        })
        .then(docs => success(res, docs, docs.length + Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.add = async (req, res, next) => {
    const { recruiter, jobId, firstName, lastName, email, mobile } = req.body;
    const recruitment = new Recruitment({
        recruiter, jobId, firstName, lastName, email, mobile
    });
    const doc = await recruitment.save()
    const options = new mailOptions({
        from: 'lucky.kshp@gmail.com',
        to: email,
        subject: 'HRMS - New Recruitment',
        text: `Welcome ${firstName}`,
        html: '<b>your email has been added to our system, our hr team will contact you</b>',
    })
    transporter.sendMail(options, (error, info) => {
        if (error) {
            error(res, error, Constants.ErrorCreating)
        } else {
            success(res, doc._id, Constants.RecordsCreated)
        }
    });
}

exports.update = async (req, res, next) => {
    const { _id: id, jobId, firstName, lastName, email, mobile } = req.body;
    Recruitment
        .findByIdAndUpdate(id, { jobId, firstName, lastName, email, mobile }, { upsert: true })
        .then(doc => success(res, doc, Constants.RecordsUpdated))
        .catch(err => error(res, err, Constants.ErrorUpdating));
}

exports.updateStatus = async (req, res, next) => {
    const { _id: id, status } = req.body;
    if (status === 9) {
        const item = await Recruitment.findById(id).populate({
            path: 'jobId',
            select: { profile: true },
        });
        const empLength = (await Employee.find({})).length;
        let empCode = '';
        if (empLength < 10) {
            empCode = 'COM-00' + empLength;
        } else if (empLength >= 10 && empLength < 100) {
            empCode = 'COM-0' + empLength;
        } else {
            empCode = 'COM-' + empLength;
        }
        if (item.status === '7') {
            const salt = await bcryptjs.genSalt(10);
            const hashedPass = await bcryptjs.hash('12345678', salt);
            const employee = new Employee({
                firstName: item.firstName,
                lastName: item.lastName,
                email: item.firstName[0] + item.lastName[0] + '@company.com',
                personalEmail: item.email,
                mobile: item.mobile,
                password: hashedPass,
                empCode,
                joiningDate: new Date(),
                designation: item.jobId.profile
            });
            const doc = await employee.save();
            const lb = new LeaveBalance({
                employee: doc._id,
                paidLeave: 10,
                sickLeave: 10,
                casualLeave: 10,
            });
            await lb.save();
            const options = new mailOptions({
                from: 'lucky.kshp@gmail.com',
                to: item.email,
                subject: 'HRMS - welcome',
                text: `Welcome ${item.firstName}`,
                html: `
                    Congratulations! </br>
                    You have been hired as a part of our team at Lucky KSHP Pvt Ltd.</br>
                    Kindly login with the following credentials:</br></br>
                    Email: ${item.email}</br>
                    Password: 12345678</br>

                `,
            })
            transporter.sendMail(options, (error, info) => {
                if (error) {
                    error(res, error, Constants.ErrorCreating)
                } else {
                    success(res, doc._id, Constants.RecordsCreated)
                }
            });
        }
    }
    Recruitment
        .findByIdAndUpdate(id, { status }, { upsert: true })
        .then(doc => success(res, doc, Constants.RecordsUpdated))
        .catch(err => error(res, err, Constants.ErrorUpdating));
}

exports.delete = async (req, res, next) => {
    const { id } = req.params;
    Recruitment
        .findByIdAndRemove(id)
        .then(doc => success(res, doc, Constants.RecordsRemoved))
        .catch(err => error(res, err, Constants.ErrorRemoving));
}