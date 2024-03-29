import express from "express";

import home from "./home";

import inquiry from "./inquiry";
import news from "./news";
import disaster from "./disaster";
import login from "../admin/login";

const router = express.Router()

router.use('/', home)

// Item listing
router.use('/disaster', disaster)
router.use('/inquiry', inquiry)
router.use('/news', news)
router.use('/login', login)

export default router