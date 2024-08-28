const express = require("express");
const router = express.Router();
const razorpay = require("../../config/razorpay");

router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: "order_receipt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const isValid = await razorpayService.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );
    res.json({ valid: isValid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/details/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;
    const paymentDetails = await razorpayService.fetchPaymentDetails(paymentId);
    res.json(paymentDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/capture/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { amount, currency } = req.body;
    const capturedPayment = await razorpayService.capturePayment(
      paymentId,
      amount,
      currency
    );
    res.json(capturedPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/recurring/create-plan", async (req, res) => {
  try {
    const plan = await razorpayService.createRecurringPlan(req.body);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/recurring/create-subscription", async (req, res) => {
  try {
    const subscription = await razorpayService.createSubscription(req.body);
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
