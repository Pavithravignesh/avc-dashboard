import express from "express";
import { getAccountIndustry } from "../controllers/accountIndustry.js";

const router = express.Router();

router.get("/viewData", getAccountIndustry);

export default router;
