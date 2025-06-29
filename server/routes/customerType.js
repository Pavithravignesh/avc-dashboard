import express from "express";
import { getCustomerType } from "../controllers/customerType.js";

const router = express.Router();

router.get("/viewData", getCustomerType);

export default router;
