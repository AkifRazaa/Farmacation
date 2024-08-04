const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop',
        required: true
    },
    education:
    {
        stage: {
            type: String,
            enum: ['Sowing', 'Flowering', 'Harvesting', 'Preparing'],
            // required: true
        },
        title: {
            type: String,
            required: true
        },
        information: [{
            type: {
                type: String,
                enum: ['text', 'image'],
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }]
    },


    date: {
        type: Date,
        default: Date.now
    }
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
