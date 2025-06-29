import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      default: null,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    occupation: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    transactions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction'
    }],
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "superadmin"],
      default: "user"
    }
  },
  { timestamps: true }
);

// Create indexes for better query performance
UserSchema.index({ role: 1 });
UserSchema.index({ country: 1 });
UserSchema.index({ city: 1 });
UserSchema.index({ name: 1 });

const User = mongoose.model("User", UserSchema);

export default User; 