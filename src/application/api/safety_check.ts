import express from "express";

const router = express.Router()

// 安否確認が必要か否かの確認
router.get('/', async (req: express.Request, res: express.Response) => {
    // TODO: statusの設定
    let status = false
    if (status) {
        return res.status(200).json({check: 'True'})
    }
    else {
        return res.status(200).json({check: 'False'})
    }
})

export default router