const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({

    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {

        type: Date,
        default: Date.now,
    },
    userId: {

        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    images: [String],
    propertyName: String
})

const Favourite = mongoose.model('favourite', favouriteSchema)

module.exports = Favourite