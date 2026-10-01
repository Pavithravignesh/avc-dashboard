import Team from "../models/Team.js";

export const getTeam = async (req, res) => {
  try {
    const dataTeam = await Team.find({});
    res.status(200).json(dataTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};