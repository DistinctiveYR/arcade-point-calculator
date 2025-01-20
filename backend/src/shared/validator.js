const joi = require('joi');

const email = joi.string().email().required();
const category = joi.string().required();
const description = joi.string().required();

module.exports = { email, category, description }; 