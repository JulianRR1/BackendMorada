import express from "express";
import { loginAdmin, registerUser } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/admin/login", loginAdmin);
router.post("/register", registerUser);

export default router;