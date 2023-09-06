// Exports Success Response
const success = (res, data, message) => res.status(200).json({ data, status: true, message });

// Exports Error Response
const error = (res, data, message) => res.status(404).json({ data, status: false, message });

// Exports Unauthorized Response
const unauthorize = (res, data, message) => res.status(401).json({ data, status: false, message });

// Exports Response nothing changed
const nothingChanged = (res, data, message) => res.status(201).json({ data, status: false, message });

// Exports Response nothing changed
const duplicate = (res, data, message) => res.status(409).json({ data, status: false, message });

module.exports = {
    success,
    error,
    unauthorize,
    nothingChanged,
    duplicate
}