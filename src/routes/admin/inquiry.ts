import express from "express";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { Inquiry } from "../../infrastructure/db/entity/Inquiry";
const router = express.Router()

router.get('/', async (req: express.Request, res: express.Response) => {
    const inquiry = await AppDataSource.getRepository(Inquiry)
        .createQueryBuilder('entity')
        .getMany();
    res.render('pages/admin/inquiry', { inquiry: inquiry })
})

export default router
