import CustomerType from "../models/CustomerType.js";

export const getCustomerType = async (req, res) => {
  try {
    const dataCustomerType = await CustomerType.find({});
    res.status(200).json(dataCustomerType);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};