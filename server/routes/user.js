import express from "express";
import { getUserById } from "../controllers/user.js";

const router = express.Router();

router.get("/viewData/:id", getUserById);

export default router;
