const Task = require("../models/Task");
const { success, error } = require('../utils/responses');

const Constants = require('../utils/constants');

exports.list = (req, res, next) => {
    Task
        .find({ empId: req.params.empId })
        .then(docs => success(res, docs, docs.length + Constants.RecordsFound))
        .catch(err => error(res, err, Constants.ErrorFinding));
}

exports.addTask = async (req, res, next) => {
    const { empId, title, description, tag, status } = req.body;
    const task = new Task({
        empId, title, description, tag, status
    });
    task
        .save()
        .then(doc => success(res, doc._id, Constants.RecordsCreated))
        .catch(err => error(res, err, Constants.ErrorCreating));
}

exports.updateTask = async (req, res, next) => {
    const { _id: id, title, description, tag, status } = req.body;
    Task
        .findByIdAndUpdate(id, { title, description, tag, status }, { upsert: true })
        .then(doc => success(res, doc, Constants.RecordsUpdated))
        .catch(err => error(res, err, Constants.ErrorUpdating));
}

exports.deleteTask = async (req, res, next) => {
    const { id } = req.params;
    Task
        .findByIdAndRemove(id)
        .then(doc => success(res, doc, Constants.RecordsRemoved))
        .catch(err => error(res, err, Constants.ErrorRemoving));
}