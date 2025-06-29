import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
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
    Team: {
      type: String,
      required: true,
      enum: ["Asia Pac", "Enterprise", "Europe", "Latin America", "North America"]
    }
  },
  { timestamps: true }
);

// Create indexes for better query performance
TeamSchema.index({ Team: 1 });
TeamSchema.index({ closed_fiscal_quarter: 1 });
TeamSchema.index({ acv: 1 });

const Team = mongoose.model("Team", TeamSchema);

export default Team; 