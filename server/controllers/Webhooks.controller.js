import Stripe from "stripe";
import Transaction from "../models/Transaction.model.js";
import User from "../models/User.model.js";

export const stripeWebhooks = async (request, response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook Signature Error:", error.message);
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    // Standard Checkout Event Use Karein
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { transactionId, appId } = session.metadata || {};

      if (appId === "quickgpt" && transactionId) {
        const transaction = await Transaction.findOne({
          _id: transactionId,
          isPaid: false,
        });

        if (transaction) {
          // Update credits in user account
          await User.updateOne(
            { _id: transaction.userId },
            { $inc: { credits: transaction.credits } },
          );

          // Update Payment status
          transaction.isPaid = true;
          await transaction.save();
          console.log(
            `Credits successfully added to User: ${transaction.userId}`,
          );
        }
      }
    }

    response.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    response.status(500).send("Internal Server Error");
  }
};
