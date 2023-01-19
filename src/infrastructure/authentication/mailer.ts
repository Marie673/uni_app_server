const nodemailer = require("nodemailer")

const mail = 'hcu.uniapp@gmail.com'
const pass = "facyksaowpjgwryf"

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: mail,
        pass: pass,
    }
})

export async function sendMail(to: string, sub: string, text: string) {
    const info = await transporter.sendMail({
        form: mail,
        to: to,
        subject: sub,
        text: text,
    })
    console.log(info)
    return info
}