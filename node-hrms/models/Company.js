const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const DesignationSchema = new Schema({
    name: { type: String },
    status: { type: String }
}, {
    timestamps: true
});

const DepartmentSchema = new Schema({
    headName: { type: ObjectId, ref: 'Employee' },
    about: { type: String },
    avatar: { type: String },
    name: { type: String, required: true },
    status: { type: String }
}, {
    timestamps: true
});

const TeamSchema = new Schema({
    manager: { type: ObjectId, ref: 'Employee' },
    name: { type: String, required: true },
    about: { type: String },
    avatar: { type: String },
    department: { type: ObjectId, ref: 'Department' },
    status: { type: String },
}, {
    timestamps: true
});

const HolidaySchema = new Schema({
    holiday: { type: String },
    date: { type: Date },
    weekday: { type: String },
    note: { type: String },
}, {
    timestamps: true
});


module.exports = {
    Team: mongoose.model('Team', TeamSchema),
    Department: mongoose.model('Department', DepartmentSchema),
    Designation: mongoose.model('Designation', DesignationSchema),
    Holiday: mongoose.model('Holiday', HolidaySchema)
};