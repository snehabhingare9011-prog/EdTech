const express = require("express");
const router = express.Router();
const { createPaymentOrder, verifySignature, sendPaymentSuccessEmail, } = require("../controllers/paymentController");
const { auth,isStudent } = require('../middlewares/auth');


// Create Razorpay payment order
router.post( "/createPaymentOrder", auth, isStudent, createPaymentOrder );

// Verify Razorpay payment signature
router.post( "/verifyPayment", auth, isStudent, verifySignature );

// Send payment success email
router.post( "/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail );


module.exports = router;