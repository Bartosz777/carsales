const mongoose = require('mongoose')
const Schema = mongoose.Schema


const carSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 70
    },
    year: {
        type: Number,
        required: true,
        min: 1990,
        max: 2023
    },
    mileage: {
        type: Number,
        required: true
    },
    mark: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 6000
    },
    pictures: [
        {
            type: String,
            required: true
        }
    ],
    price: {
        type: Number,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    }
}, { timestamps: true })



module.exports = mongoose.model('Car', carSchema)