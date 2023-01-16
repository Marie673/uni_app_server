import express from "express";
import {Inquiry} from "../../domain/entity/Inquiry";
import {extraction} from "../../infrastructure/authentication/authentication";
import {postInquiry} from "../../domain/repository/Inquiry";


const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {

    return res.status(200).json({})
})

router.post('/', async (req: express.Request, res: express.Response) => {
    let user: any = extraction(req)
    const inquiry: Inquiry = {
        user_id: user.user_id,
        title: req.body.title,
        content: req.body.content,
        datetime: new Date(Date.now()),
        isPublished: false,
    }
    await postInquiry(inquiry)
    return res.status(200).json({message: "success"})
})
export default router