import AcvRange from "../models/AcvRange.js";

export const getAcvRange = async (req, res) => {
    try {
        const dataAcvRange = await AcvRange.find({});
        res.status(200).json(dataAcvRange);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};