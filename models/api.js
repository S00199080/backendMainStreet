
const { string } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const userinfoSchema = new mongoose.Schema({
    name: String, 
    age: Number,
    county: String,
    password: String,
    email: String,
    photoID: Number,
    isSeller: Boolean

})

const UserInfo = mongoose.model('UserInfo', userinfoSchema);

function validateUserInfo(userinfo) {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().min(2).required(),
        county: Joi.string().min(0),
        password: Joi.string().min(0),
        email: Joi.string().min(0),
        photoID: Joi.number().min(0),
        isSeller: Joi.boolean()
    })
    return schema.validate(userinfo);
}

exports.UserInfo = UserInfo
exports.validate = validateUserInfo;
