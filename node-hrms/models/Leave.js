const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const LeaveBalanceSchema = new Schema({
    employee: { type: ObjectId, ref: 'Employee', required: true },
    paidLeave: { type: Number, default: 0 },
    sickLeave: { type: Number, default: 0 },
    casualLeave: { type: Number, default: 0 },
}, {
    timestamps: true
});

const LeaveSchema = new Schema({
    employee: { type: ObjectId, ref: 'Employee', required: true },
    leaveType: { type: String, required: true, enum: ['1', '2', '3'] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isHalfDay: { type: Boolean, default: false },
    days: { type: Number, default: 1 },
    approvedBy: { type: ObjectId, ref: 'Employee' },
    status: { type: Number, default: 1, enum: [1, 2, 3, 4] },
    reason: { type: String, required: true },
    balance: { type: ObjectId, ref: 'LeaveBalance', required: true }
}, {
    timestamps: true
});

// status => '1', '2', '3' => 'active', 'inactive', 'onhold'
// status => '1', '2', '3', '4' => 'pending', 'accepted', 'rejected', 'cancelled'

module.exports = {
    LeaveBalance: mongoose.model('LeaveBalance', LeaveBalanceSchema),
    Leave: mongoose.model('Leave', LeaveSchema)
};