import AccountIndustry from "../models/AccountIndustry.js";

export const getAccountIndustry = async (req, res) => {
    try {
        const dataAccountIndustry = await AccountIndustry.find({});
        res.status(200).json(dataAccountIndustry);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};