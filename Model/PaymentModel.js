const { check } = require("express-validator");
const { default: mongoose } = require("mongoose");

const paymentSchema = new mongoose.Schema({

    uaserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    price: String,
    createAt: {

        type: Date,
        default: Date.now
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: {
        adult: String,
        Childern: String,
        infants: String
    },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
})

const Payment = mongoose.model('payment', paymentSchema);
module.exports = Payment