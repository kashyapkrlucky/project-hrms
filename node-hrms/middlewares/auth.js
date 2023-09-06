const jwt = require('jsonwebtoken');
const { unauthorize } = require('../utils/responses');
const { NotAuthorized, InvalidToken } = require('../utils/constants');

// Validate Token
exports.validate = (req, res, next) => {
    const bearer = req['headers']['authorization'];
    if (bearer) {
        const token = bearer.split(' ')[1];
        jwt.verify(token, process.env.SECRET, function (err, value) {
            if (value) {
                next();
            } else {
                unauthorize(res, '', InvalidToken);
            }
        });
    } else {
        unauthorize(res, '', NotAuthorized);
    }
}

// Validate User by Id
exports.validateUser = (req, res, next) => {
    const bearer = req['headers']['authorization'];
    const userId = req.params.id || req.body.id;
    if (bearer) {
        const token = bearer.split(' ')[1];
        jwt.verify(token, process.env.SECRET, function (err, value) {
            if (value) {
                if (value.id === userId) {
                    next();
                } else {
                    unauthorize(res, '', NotAuthorized);
                }
            } else {
                unauthorize(res, '', InvalidToken);
            }
        });
    } else {
        unauthorize(res, '', NotAuthorized);
    }
}

// Validate authCreatedBy
exports.authCreatedBy = (req, res, next) => {
    const bearer = req['headers']['authorization'];
    const userId = req.params.createdBy || req.body.createdBy;
    if (bearer) {
        const token = bearer.split(' ')[1];
        jwt.verify(token, process.env.SECRET, function (err, value) {
            if (value) {
                if (value.id === userId) {
                    next();
                } else {
                    unauthorize(res, '', NotAuthorized);
                }
            } else {
                unauthorize(res, '', InvalidToken);
            }
        });
    } else {
        unauthorize(res, '', NotAuthorized);
    }
}

// Validate authModifiedBy
exports.authModifiedBy = (req, res, next) => {
    const bearer = req['headers']['authorization'];
    const userId = req.params.modifiedBy || req.body.modifiedBy;
    if (bearer) {
        const token = bearer.split(' ')[1];
        jwt.verify(token, process.env.SECRET, function (err, value) {
            if (value) {
                if (value.id === userId) {
                    next();
                } else {
                    unauthorize(res, '', NotAuthorized);
                }
            } else {
                unauthorize(res, '', InvalidToken);
            }
        });
    } else {
        unauthorize(res, '', NotAuthorized);
    }
}

// Validate authModifiedBy
exports.authSharedWith = (req, res, next) => {
    const bearer = req['headers']['authorization'];
    const userId = req.params.sharedWith || req.body.sharedWith;
    if (bearer) {
        const token = bearer.split(' ')[1];
        jwt.verify(token, process.env.SECRET, function (err, value) {
            if (value) {
                if (value.id === userId) {
                    next();
                } else {
                    unauthorize(res, '', NotAuthorized);
                }
            } else {
                unauthorize(res, '', InvalidToken);
            }
        });
    } else {
        unauthorize(res, '', NotAuthorized);
    }
}
