const express = require("express");
const { createOrder, verifyOrder } = require("../controllers/paymentController");
const { verify } = require("../middleware/verify");


const router = express.Router();

router.post("/",createOrder);
router.post("/verify-payment",verifyOrder);

module.exports = router;
