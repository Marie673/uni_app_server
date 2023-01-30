const config = require('config')
config.env = process.env.NODE_ENV
const SHEET_ID = config.googleAPI.sheetID
const GOOGLE_SERVICE_ACCOUNT_EMAIL = config.googleAPI.email
const GOOGLE_PRIVATE_KEY = config.googleAPI.private_key

import {GoogleSpreadsheet, GoogleSpreadsheetWorksheet} from "google-spreadsheet"
import * as dotenv from "dotenv"

dotenv.config()

export class GoogleSpreadsheetService {
    private static instance?: GoogleSpreadsheetService
    private doc: GoogleSpreadsheet

    private constructor() {
        this.doc = new GoogleSpreadsheet(SHEET_ID)
    }

    static async getInstance() {
        if (this.instance) {
            return this.instance
        }
        const instance = new GoogleSpreadsheetService()

        await instance.doc.useServiceAccountAuth({
            client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL ?? '',
            private_key: GOOGLE_PRIVATE_KEY
        })
        await instance.doc.loadInfo()

        return instance
    }

    getTitle() {
        return this.doc.title
    }

    async getRows() {
        const sheet = this.doc.sheetsByIndex[0]
        if (!sheet) {
            return []
        }
        const rows = await sheet.getRows()
        const header = this.getHeader()
        return rows.map((row) => header.map((h) => row[h]))
    }

    getHeader() {
        const sheet = this.doc.sheetsByIndex[0]
        if (!sheet){
            return []
        }
        return sheet.headerValues
    }
}
