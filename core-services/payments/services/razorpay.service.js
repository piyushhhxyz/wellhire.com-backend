const razorpay = require("../../../config/razorpay");
const crypto = require("crypto");

exports.createOrder = async (amount, currency) => {
  return await razorpay.orders.create({
    amount,
    currency,
    receipt: `receipt_${Date.now()}`,
  });
};

exports.verifyPayment = (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  return expectedSignature === razorpay_signature;
};

exports.fetchPaymentDetails = async (paymentId) => {
  return await razorpay.payments.fetch(paymentId);
};

exports.capturePayment = async (paymentId, amount, currency) => {
  return await razorpay.payments.capture(paymentId, amount, currency);
};

exports.createRecurringPlan = async (planData) => {
  return await razorpay.plans.create(planData);
};

exports.createSubscription = async (subscriptionData) => {
  return await razorpay.subscriptions.create(subscriptionData);
};
