const { LeaveBalance, Leave } = require("../models/Leave");
const Employee = require("../models/Employee");
const { success, error } = require('../utils/responses');
const Constants = require('../utils/constants');
const leaveTypes = ['paidLeave', 'sickLeave', 'casualLeave'];

exports.addLeaveBalance = async (req, res, next) => {
    const empIds = await Employee.find({}).select({ _id: true });
    const balances = [];
    for (let i = 0; i < empIds.length; i++) {
        const elem = {
            employee: empIds[i],
            paidLeave: 10,
            sickLeave: 10,
            casualLeave: 10,
        };
        balances.push(elem);
    }
    LeaveBalance
        .insertMany(balances)
        .then(docs => success(res, '', docs.length + Constants.RecordsCreated))
        .catch(err => error(res, err, Constants.ErrorCreating));
}

exports.getLeaveBalance = (req, res, next) => {
    const { employee } = req.params;
    LeaveBalance
        .findOne({ employee })
        .then(docs => success(res, docs, Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.getMyLeaves = (req, res, next) => {
    const { employee } = req.params;
    Leave
        .find({ employee })
        .sort({ createdAt: 'desc' })
        .then(docs => success(res, docs, docs.length + Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.addMyLeave = async (req, res, next) => {
    const { employee, leaveType,
        startDate, endDate,
        isHalfDay, days,
        approvedBy, status,
        reason } = req.body;
    const availBalance = await LeaveBalance.findOne({ employee })
    const leaveTypeBalance = await availBalance[leaveTypes[leaveType - 1]];
    if (leaveTypeBalance) {
        const leave = new Leave({
            employee, leaveType,
            startDate, endDate,
            isHalfDay, days,
            approvedBy, status,
            reason,
            balance: availBalance._id
        });
        await leave.save();
        LeaveBalance
            .findOneAndUpdate(
                { _id: availBalance._id },
                { $inc: { [leaveTypes[leaveType - 1]]: -1 } }
            )
            .then(() => success(res, '', Constants.RecordsCreated))
            .catch(err => error(res, err, Constants.ErrorCreating));

    } else {
        error(res, '', 'You don\'t have enough balance');
    }
}

exports.updateStatus = async (req, res, next) => {
    const { id, balanceId, leaveType, status } = req.body;
    await Leave.findByIdAndUpdate(id, { status });
    const incVal = status === 2 ? 0 : 1;
    LeaveBalance
        .findOneAndUpdate(
            { _id: balanceId },
            { $inc: { [leaveType]: incVal } }
        )
        .then(() => success(res, '', Constants.RecordsUpdated))
        .catch(err => error(res, err, Constants.ErrorUpdated));
}


exports.getApprovalLeaves = async (req, res, next) => {
    const { employee } = req.params;
    const reportees = await Employee.find({ reportingTo: employee }).select({ _id: 1 });
    const ids = reportees.map(x => x._id);
    Leave
        .find({ employee: { $in: ids } })
        .populate({
            path: 'employee',
            select: { firstName: 1, lastName: 1, avatar: 1 }
        })
        .sort({ createdAt: 'desc' })
        .then(docs => success(res, docs, docs.length + Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}