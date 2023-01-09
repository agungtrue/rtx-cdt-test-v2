import { make } from 'simple-body-validator';
import httpStatus from 'http-status';

function updateProperty (req, res, next) {
    const payload = req.body;

    // basic rules
    const rules = {
        name: 'required|string',
        location: 'required|string|min:3',
    };

    // using simple-body-validator
    const validator = make(payload, rules);

    if (!validator.validate()) {
        return res.status(httpStatus.BAD_REQUEST).json({
            status: "BAD_REQUEST",
            errors: validator.errors().all(),
        });
    };

    next();
};

function createProperty (req, res, next) {
    const payload = req.body;

    // basic rules
    const rules = {
        locale: 'required|string|min:3',
        propertyCode: 'required|string',
        name: 'required|string|min:5',
    };

    // using simple-body-validator
    const validator = make(payload, rules);

    if (!validator.validate()) {
        return res.status(httpStatus.BAD_REQUEST).json({
            status: "BAD_REQUEST",
            errors: validator.errors().all(),
        });
    };

    next();
};


export default {
    createProperty,
    updateProperty,
}
