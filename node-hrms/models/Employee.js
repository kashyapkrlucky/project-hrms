const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const EmployeeSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, index: true },
    personalEmail: { type: String, required: true, index: true },
    mobile: { type: Number, required: true },
    avatar: { type: String },
    password: { type: String, required: true },
    dob: { type: Date },
    department: { type: ObjectId, ref: 'Department' },
    team: { type: ObjectId, ref: 'Team' },
    designation: { type: ObjectId, ref: 'Designation' },
    empCode: { type: String },
    empStatus: { type: String, default: 'Active', enum: ['Active', 'Inactive'] },
    joiningDate: { type: Date },
    reportingTo: { type: ObjectId, ref: 'Employee' }
}, {
    timestamps: true
});

EmployeeSchema.index({ name: "text" });

module.exports = mongoose.model('Employee', EmployeeSchema);