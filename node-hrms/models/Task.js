const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const TaskSchema = new Schema({
    empId: { type: ObjectId, ref: 'Employee', required: true },
    title: { type: String, required: true },
    description: { type: String },
    tag: { type: String, default: '1', enum: ['1', '2', '3'] },
    status: { type: String, default: '1', enum: ['1', '2', '3'] },
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);

// tag => '1', '2', '3' => 'important', 'personal', 'misc'
// status => '1', '2', '3' => 'new', 'inprocess', 'done'