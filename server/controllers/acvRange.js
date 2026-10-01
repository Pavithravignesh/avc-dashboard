import AcvRange from "../models/AcvRange.js";

export const getAcvRange = async (req, res) => {
    try {
        const dataAcvRange = await AcvRange.find({});
        res.status(200).json(dataAcvRange);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};