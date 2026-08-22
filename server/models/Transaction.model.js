import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

// Prevent overwriting model error during nodemon/server hot-reloads
const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
