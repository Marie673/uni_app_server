const nodemailer = require("nodemailer")
const config = require('config')
config.env = process.env.NODE_ENV


const mail = config.mailer.email
const pass = config.mailer.passowrd

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