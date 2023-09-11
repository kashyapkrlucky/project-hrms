const Message = require("../models/Message");
const { success, error } = require('../utils/responses');
const { ObjectId } = require('mongoose').Types;
const Constants = require('../utils/constants');

// Create Message
exports.send = (req, res, next) => {
    const { from, to, text } = req.body;
    const message = new Message({ from, to, text })
    message
        .save()
        .then(doc => success(res, doc, Constants.RecordsCreated))
        .catch(err => error(res, err, Constants.ErrorCreating));
};

// Get Messages For thread
exports.threads = async (req, res, next) => {
    const { empId } = req.params;
    const docs = await Message
        .aggregate([
            {
                $match: {
                    $or: [
                        { from: new ObjectId(empId) },
                        { to: new ObjectId(empId) }
                    ]
                }
            },
            {
                $project: {
                    "_id": 0,
                    "with": {
                        $cond: {
                            if: { $eq: ["$from", new ObjectId(empId)] },
                            then: "$to",
                            else: "$from"
                        }
                    },
                    "text": "$text",
                    "created_at": "$created_at"
                }
            },
            {
                $group: {
                    _id: "$with",
                    lastMessage: { "$last": "$text" }
                }
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    _id: 0,
                    "user._id": 1,
                    "user.firstName": 1,
                    "user.lastName": 1,
                    "user.avatar": 1,
                    lastMessage: 1
                }
            }
        ]);
    success(res, docs, Constants.RecordsFound);
}

// Get Messages For thread
exports.list = async (req, res, next) => {
    const { from, to } = req.body;
    const docs = await Message
        .aggregate([
            {
                $match: {
                    from: { $in: [new ObjectId(from), new ObjectId(to)] },
                    to: { $in: [new ObjectId(from), new ObjectId(to)] }
                }
            }
        ])
    success(res, docs, Constants.RecordsFound);
};