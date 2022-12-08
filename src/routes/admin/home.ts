import express from "express";

const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    console.log(req.body)
    res.render('pages/admin/home')
})

export default router
