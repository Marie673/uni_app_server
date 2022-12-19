import express from "express";

const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {
    console.log(req.body)

})

export default router