const joi = require('joi')
const { email, category, description } = require('../../shared/validator');

const querySchema = joi.object({
    email : email,
    category: category,
    description : description,
});

const queryValidator = (body) => {
    return querySchema.validate(body);
}

module.exports = queryValidator;