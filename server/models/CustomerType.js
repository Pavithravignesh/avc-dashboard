import mongoose from "mongoose";

const CustomerTypeSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: true
    },
    acv: {
      type: Number,
      required: true
    },
    closed_fiscal_quarter: {
      type: String,
      required: true
    },
    Cust_Type: {
      type: String,
      required: true,
      enum: ["Existing Customer", "New Customer"]
    }
  },
  { timestamps: true }
);

// Create indexes for better query performance
CustomerTypeSchema.index({ Cust_Type: 1 });
CustomerTypeSchema.index({ closed_fiscal_quarter: 1 });
CustomerTypeSchema.index({ acv: 1 });

const CustomerType = mongoose.model("CustomerType", CustomerTypeSchema);

export default CustomerType; 