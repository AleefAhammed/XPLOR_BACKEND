const mongoose = require('mongoose');

const hostSchema = new mongoose.Schema({
    name: String,
    phoneNumber: Number,
    location: String,
    email: String,
    userType: String,
    createdAt: {

        type: Date,
        default: Date.now
    },
    password: {

        required: true,
        minLength: 8,
        type: String
    },
    Reviews: [

        {
            postId: String,
            body: String,
            date: String
        },
    ],
});

const Host = mongoose.model('host', hostSchema);

module.exports = Host