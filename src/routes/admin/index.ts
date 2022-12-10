import express from "express";

import home from "./home";
import inquiry from "./inquiry";
import news from "./news";
import disaster from "./disaster";

const router = express.Router()

router.use('/', home)
router.use('/disaster', disaster)
router.use('/inquiry', inquiry)
router.use('/news', news)

export default router