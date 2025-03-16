const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    phoneNumber: Number,
    email: {

        required: true,
        unique: true,
        type: String
    },
    gender: String,
    createdAt: {
        type: Date,
        default: Date.now, // Function reference to dynamically assign the current date
    },
    password: String,
    about: {

        type: String,
        maxLength: 250
    },
    image: String,
    city: String,
    country: String
});

const User = mongoose.model('user', userSchema);

module.exports = User 