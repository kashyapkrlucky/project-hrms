const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const RecruitmentSchema = new Schema({
    recruiter: { type: ObjectId, ref: 'Employee', required: true },
    jobId: { type: ObjectId, ref: 'Job', required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, index: true },
    mobile: { type: Number, required: true },
    status: { type: String, default: '1', enum: ['1', '2', '3', '4', '5', '6'] },
}, {
    timestamps: true
});

module.exports = mongoose.model('Recruitment', RecruitmentSchema);


// status => '1', '2', '3', '4', '5', '6' => 'new', 'interviewing', 'selected', 'rejected', 'onhold', 'onboarded'