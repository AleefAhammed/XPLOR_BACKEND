const express = require('express');
const checkLogin = require('../MIddleware/CheckLogin');
const { addPayment, verifyPayment } = require('../Controllers/PaymentControlls');
const router = express.Router()


router.post('/orders', checkLogin, addPayment)
router.post('/verify', verifyPayment)

module.exports = router
