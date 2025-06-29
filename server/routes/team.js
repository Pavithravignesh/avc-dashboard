import express from "express";
import { getTeam } from "../controllers/team.js";

const router = express.Router();

router.get("/viewData", getTeam);

export default router;
