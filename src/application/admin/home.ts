import express from "express";

const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    res.render('pages/admin/home')
})

export default router
