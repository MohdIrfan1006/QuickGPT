import Transaction from "../models/Transaction.model.js";
import Stripe from "stripe";
import User from "../models/User.model.js";

const plans = [
  {
    _id: "basic",
    name: "Basic",
    price: 10,
    credits: 100,
    features: [
      "100 text generations",
      "50 image generations",
      "Standard support",
      "Access to basic models",
    ],
  },
  {
    _id: "pro",
    name: "Pro",
    price: 20,
    credits: 500,
    features: [
      "500 text generations",
      "200 image generations",
      "Priority support",
      "Access to pro models",
      "Faster response time",
    ],
  },
  {
    _id: "premium",
    name: "Premium",
    price: 30,
    credits: 1000,
    features: [
      "1000 text generations",
      "500 image generations",
      "24/7 VIP support",
      "Access to premium models",
      "Dedicated account manager",
    ],
  },
];

// API Controller for getting all plans
export const getPlans = async (req, res) => {
  try {
    res.json({ success: true, plans });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// API Controller for purchasing a plan
export const purchasePlan = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user._id;

    const plan = plans.find((plan) => plan._id === planId);

    if (!plan) {
      return res.json({ success: false, message: "Invalid plan" });
    }

    const transactionData = {
      userId,
      planId: plan._id,
      amount: plan.price,
      credits: plan.credits,
      isPaid: false,
    };

    const newTransaction = await Transaction.create(transactionData);

    // Define origin for Stripe checkout redirect
    const origin =
      req.headers.origin || process.env.FRONTEND_URL || "http://localhost:5173";

    // Create Stripe session and send single response
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: plan.price * 100,
            product_data: {
              name: plan.name,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Redirect to /credits page with success and transactionId
      success_url: `${origin}/credits?success=true&transactionId=${newTransaction._id}`,
      cancel_url: `${origin}/credits`,
      metadata: {
        transactionId: newTransaction._id.toString(),
        appId: "quickgpt",
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Expires in 30 minutes
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API Controller to Verify Payment (Localhost fallback when Webhook doesn't trigger)
export const verifyStripe = async (req, res) => {
  try {
    const { transactionId } = req.body;

    if (!transactionId) {
      return res.json({ success: false, message: "Transaction ID missing" });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.json({ success: false, message: "Transaction not found" });
    }

    if (!transaction.isPaid) {
      // User update with updated returnDocument option
      const updatedUser = await User.findByIdAndUpdate(
        transaction.userId,
        { $inc: { credits: Number(transaction.credits) } },
        { returnDocument: "after" }, // 👈 Updated here to remove deprecation warning
      );

      transaction.isPaid = true;
      await transaction.save();

      return res.json({
        success: true,
        message: "Credits added successfully",
        credits: updatedUser.credits,
      });
    }

    res.json({ success: false, message: "Transaction already processed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
