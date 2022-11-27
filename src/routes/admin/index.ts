import express from "express";
import dashboard from "./dashboard";

const router = express.Router()

router.use('/dashboard', dashboard)

export default router