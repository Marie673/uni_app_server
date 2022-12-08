import express from "express";

const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    console.log(req.body)
    res.render('admin/dashboard')
})

export default router