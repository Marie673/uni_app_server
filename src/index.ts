import express from "express"
import bodyParser from "body-parser";
import api from "./application/api/index"
import admin from "./application/admin/index"
import "reflect-metadata"

import {AppDataSource} from "./infrastructure/db/data-source";
import * as UserRepository from "./domain/repository/User"

import root from "./application/root";
import {User, UserRole} from "./domain/entity/User";
import {GoogleSpreadsheetService} from "./infrastructure/googleAPI/spreadsheet";


const config = require('config')
config.env = process.env.NODE_ENV


AppDataSource.initialize()
    .then(async () => {
        const app = express()

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
            app.use('/root', root)


            const port = process.env.PORT || 3000
            app.listen(port, () =>
                console.log("Express WebApi listening on port " + port))

            /*
            const a = await GoogleSpreadsheetService.getInstance()
            console.log("testtest")
            console.log(await a.getRows())
             */

        }
        catch (e) {
            console.log(e)
            return
        }
    })
