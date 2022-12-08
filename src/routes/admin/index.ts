import express from "express";
import dashboard from "./home";
const router = express.Router()

router.use('/', dashboard)


export default router