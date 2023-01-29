import express from "express";
import passport from "passport"

const router = express.Router()
const app = express()


router.get("/", (req: express.Request, res: express.Response) => {
    const title: string = "login"
    res.render("pages/admin/login", {
        title: title,
        error: req.query.err ? "ユーザーIDあるいはパスワードが正しくありません" : ""
    })
})

router.post("/", (req: express.Request, res: express.Response) => {
    passport.authenticate("local", {
        successRedirect: "/manage",
        failureRedirect: "/login?err=1",
    })(req, res)
})

export default router