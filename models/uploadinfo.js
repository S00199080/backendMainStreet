
const { string } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const uploadinfoSchema = new mongoose.Schema({
    price:Number,
    productType:String,
    description:String



})

const UploadInfo = mongoose.model('UploadInfo', uploadinfoSchema);

function validateUploadInfo(uploadinfo) {
    const schema = Joi.object({
        price: Joi.number(),
        productType: Joi.string(),
        description: Joi.string()
    })
    return schema.validate(uploadinfo);
}

exports.UploadInfo = UploadInfo
exports.validate = validateUploadInfo;
