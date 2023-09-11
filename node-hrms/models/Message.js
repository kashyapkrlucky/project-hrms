const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const MessageSchema = new Schema({
    from: { type: ObjectId, ref: 'Employee', required: true },
    to: { type: ObjectId, ref: 'Employee', required: true },
    text: { type: String, required: true }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Message', MessageSchema);