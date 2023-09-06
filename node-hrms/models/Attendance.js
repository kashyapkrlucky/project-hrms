const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const AttendanceSchema = new Schema({
    employee: { type: ObjectId, ref: 'Employee', required: true },
    inTime: { type: Date, required: true },
    outTime: { type: Date },
    location: { type: String, default: 'Office', enum: ['Office', 'Remote'] },
    isCheckedIn: { type: Boolean, default: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Attendance', AttendanceSchema);