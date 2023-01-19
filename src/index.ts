import * as https from "https";
import express from "express"
import bodyParser from "body-parser";
import api from "./application/api/index"
import admin from "./application/admin/index"
import "reflect-metadata"

import {AppDataSource} from "./infrastructure/db/data-source";
import * as http from "http";
import * as fs from "fs";
import {isNonEmptyString} from "firebase-admin/lib/utils/validator";
import {sendMail} from "./infrastructure/authentication/mailer";


const config = require('config')
config.env = process.env.NODE_ENV


AppDataSource.initialize()
    .then(async () => {
        const app = express()
        const server = https.createServer({
            key: fs.readFileSync('./auth/server_key.pem'),
            cert: fs.readFileSync('./auth/cert.pem')
        }, app)

        app.set('view engine', 'ejs');

        // TODO: bodyがjsonじゃなかったときの処理
        try {
            app.use(bodyParser.json())
            app.use(express.json())
            app.use(express.urlencoded({extended: true}))


            app.get('/', (req, res) => {
                // ACM用のターゲットのヘルスチェック返す用
                return res.status(200).json()
            })

            app.use((req: express.Request, res: express.Response, next) => {
                console.log('ip: %O method: %O path: %O header: %O body: %O', req.ip, req.method, req.path, req.headers, req.body)
                next()
            })

            app.use('/api', api)
            app.use('/admin', admin)


            const port = process.env.PORT || 3000
            app.listen(port, () =>
                console.log("Express WebApi listening on port " + port))
        }
        catch (e) {
            console.log(e)
            return
        }
    })
