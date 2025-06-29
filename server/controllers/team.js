import Team from "../models/Team.js";

export const getTeam = async (req, res) => {
  try {
    const dataTeam = await Team.find({});
    res.status(200).json(dataTeam);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};