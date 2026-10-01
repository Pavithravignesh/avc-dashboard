import mongoose from "mongoose";
import User from "../models/User.js";

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ message: "User not found" });
        }

        // Only expose what the UI needs; never send passwords or contact details
        const user = await User.findById(id).select("name role");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
