const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop',
        required: true
    },
    disease:
    {
        stage: {
            type: String,
            enum: ['Pest', 'Weed'],
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

const Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease;
