import express from "express";
import {Inquiry} from "../../domain/entity/Inquiry";
import {extraction} from "../../infrastructure/authentication/authentication";
import {postInquiry} from "../../domain/repository/Inquiry";


const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {

    return res.json({})
})

router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        let user: any = extraction(req)
        const inquiry: Inquiry = {
            user_id: user.user_id,
            title: req.body.title,
            content: req.body.content,
            datetime: new Date(Date.now()),
            isPublished: false,
        }
        await postInquiry(inquiry)
        return res.json({succeed: true})
    }
    catch (e) {
        console.log(e)
        return res.json({succeed: false})
    }
})
export default router