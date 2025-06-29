import mongoose from "mongoose";

const AccountIndustrySchema = new mongoose.Schema(
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
        Acct_Industry: {
            type: String,
            required: true
        },
        query_key: {
            type: String,
            default: "industry"
        },
        Total_Quantity: {
            type: Number,
            default: null
        }
    },
    { timestamps: true }
);

// Create indexes for better query performance
AccountIndustrySchema.index({ Acct_Industry: 1 });
AccountIndustrySchema.index({ closed_fiscal_quarter: 1 });
AccountIndustrySchema.index({ query_key: 1 });

const AccountIndustry = mongoose.model("AccountIndustry", AccountIndustrySchema);

export default AccountIndustry; 