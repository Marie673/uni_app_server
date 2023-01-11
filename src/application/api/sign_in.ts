import express from "express";

const router = express.Router()

router.post('/', async (req: express.Request, res: express.Response) => {

    // TODO
    // dbにユーザーが存在するか問い合わせ
    // いなければdbに登録して成功
})

export default router