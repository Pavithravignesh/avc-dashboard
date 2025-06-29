import express from "express";
import { getUser, getUserById } from "../controllers/user.js";

const router = express.Router();

router.get("/viewData", getUser);
router.get("/viewData/:id", getUserById);

export default router;
