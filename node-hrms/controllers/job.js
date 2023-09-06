const Job = require("../models/Job");
const Recruitment = require("../models/Recruitment");

const { success, error } = require('../utils/responses');

const Constants = require('../utils/constants');

exports.list = (req, res, next) => {
    Job
        .find({})
        .select({ recruiter: 1, profile: 1, location: 1, jobType: 1, positions: 1 })
        .sort({ createdAt: 'desc' })
        .populate({
            path: 'profile',
            select: { name: true }
        })
        .populate({
            path: 'recruiter',
            select: { firstName: 1, lastName: 1, avatar: 1 }
        })
        .then(docs => success(res, docs, docs.length + Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const candidates = await Recruitment
            .find({ jobId: id })
            .select({ firstName: 1, lastName: 1, email: 1, mobile: 1, status: 1 });

        const info = await Job
            .findById(id)
            .populate({
                path: 'profile',
                select: { name: true }
            })
            .populate({
                path: 'recruiter',
                select: { firstName: 1, lastName: 1, avatar: 1 }
            });
        const jobInfo = await Object.assign({}, info._doc, { candidates });
        success(res, jobInfo, Constants.RecordsFound);
    } catch (error) {
        error(res, error, Constants.ErrorFinding)
    }
}

exports.add = async (req, res, next) => {
    const { recruiter, profile, location, requiredSkills, description, positions, jobType } = req.body;
    const job = new Job({
        recruiter, profile, location, requiredSkills, description, positions, jobType
    });
    job
        .save()
        .then(doc => success(res, doc._id, Constants.RecordsCreated))
        .catch(err => error(res, err, Constants.ErrorCreating));
}

exports.update = async (req, res, next) => {
    const { _id: id, profile, location, requiredSkills, description, positions, jobType, status } = req.body;
    Job
        .findByIdAndUpdate(id, { profile, location, requiredSkills, description, positions, jobType, status }, { upsert: true })
        .then(doc => success(res, doc, Constants.RecordsUpdated))
        .catch(err => error(res, err, Constants.ErrorUpdating));
}

exports.delete = async (req, res, next) => {
    const { id } = req.params;
    Job
        .findByIdAndRemove(id)
        .then(doc => success(res, doc, Constants.RecordsRemoved))
        .catch(err => error(res, err, Constants.ErrorRemoving));
}