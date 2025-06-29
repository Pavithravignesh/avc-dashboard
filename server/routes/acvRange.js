import express from "express";
import { getAcvRange } from "../controllers/acvRange.js";

const router = express.Router();

router.get("/viewData", getAcvRange);

export default router;