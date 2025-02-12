import { Schema, Types, model } from "mongoose";

const deviceSchema = new Schema({
    brand: {
        type: String,
        required: true,
        minlength: 2,
    },
    model: {
        type: String,
        required: true,
        minlength: 5,
    },
    hardDisk: {
        type: String,
        required: true,
        minlength: 5,
    },
    screenSize: {
        type: String,
        required: true,
        minlength: 1,
    },
    ram: {
        type: String,
        required: true,
        minlength: 2,
    },
    operatingSystem: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    cpu: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
    },
    gpu: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: true,
        min: 0, 
    },
    color: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10,
    },
    weight: {
        type: String,
        required: true,
        minlength: 1,
    },
    imageUrl: {
        type: String,
        required: true,
        match: /^https?:\/\//, 
    },
    preferredList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: [{
        type: Types.ObjectId,
        ref: 'User'
    }]
});

const Device = model('Device', deviceSchema);

export default Device;