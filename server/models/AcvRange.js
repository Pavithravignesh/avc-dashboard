import mongoose from "mongoose";

const AcvRangeSchema = new mongoose.Schema(
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
    ACV_Range: {
      type: String,
      required: true,
      enum: ["<$20K", "$20K - 50K", "$50K - 100K", "$100K - 200K", ">=$200K"]
    }
  },
  { timestamps: true }
);

// Create indexes for better query performance
AcvRangeSchema.index({ ACV_Range: 1 });
AcvRangeSchema.index({ closed_fiscal_quarter: 1 });
AcvRangeSchema.index({ acv: 1 });

const AcvRange = mongoose.model("AcvRange", AcvRangeSchema);

export default AcvRange; 