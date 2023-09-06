const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProfileSchema = new Schema({
    employee: { type: ObjectId, ref: 'Employee', required: true },
    username: { type: String, index: true },
    aboutMe: { type: String },
    coverPhoto: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);