const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const JobSchema = new Schema({
    recruiter: { type: ObjectId, ref: 'Employee', required: true },
    profile: { type: ObjectId, ref: 'Designation', required: true },
    requiredSkills: { type: String, required: true },
    description: { type: String, required: true },
    positions: { type: Number, default: 1 },
    jobType: { type: String, default: '1', enum: ['1', '2'] },
    location: { type: String, required: true },
    status: { type: String, default: '1', enum: ['1', '2', '3'] },
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', JobSchema);

// jobType => '1', '2' => 'Full Time', 'Part Time'
// status => '1', '2', '3' => 'active', 'inactive', 'onhold'