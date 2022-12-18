import * as mariadb from "mariadb"
import {User, Timetable} from "../../domain/user"


const pool = mariadb.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "user",
    password: "password",
    database: "testdb",
    connectionLimit: 5
})

export const getUser = async (uuid: number): Promise<Promise<User> | unknown>=> {
    let conn: mariadb.PoolConnection | undefined
    conn = await pool.getConnection()
    try {
        const response = await conn.query("select * from user where uuid = ?", [uuid])
        if (response[0].uuid != uuid) {
            return null
        }
        // TODO 例外処理
        return new Promise((resolve) => {
            const user: User = {
                uuid: response[0].uuid,
                name: response[0].name,
                password: response[0].password,
            }
            resolve(user)
        })
    }
    catch (err){
        return err
    }
    finally {
        await conn.end()
    }
}

export async function getTimeTable (uuid: number): Promise<Timetable | unknown> {
    let conn: mariadb.PoolConnection | undefined
    conn = await pool.getConnection()
    try {
        const response_ = await conn.query("select * from Timetables where uuid = ?", [uuid])
        let response = response_[0]

        return new Promise((resolve) => {
            let timetable: Timetable = {
                mon_period_1: response.mon_period_1,
                mon_period_2: response.mon_period_2,
                mon_period_3: response.mon_period_3,
                mon_period_4: response.mon_period_4,
                mon_period_5: response.mon_period_5,
                tue_period_1: response.tue_period_1,
                tue_period_2: response.tue_period_2,
                tue_period_3: response.tue_period_3,
                tue_period_4: response.tue_period_4,
                tue_period_5: response.tue_period_5,
                wed_period_1: response.wed_period_1,
                wed_period_2: response.wed_period_2,
                wed_period_3: response.wed_period_3,
                wed_period_4: response.wed_period_4,
                wed_period_5: response.wed_period_5,
                thu_period_1: response.thu_period_1,
                thu_period_2: response.thu_period_2,
                thu_period_3: response.thu_period_3,
                thu_period_4: response.thu_period_4,
                thu_period_5: response.thu_period_5,
                fri_period_1: response.fri_period_1,
                fri_period_2: response.fri_period_2,
                fri_period_3: response.fri_period_3,
                fri_period_4: response.fri_period_4,
                fri_period_5: response.fri_period_5,
            }
            resolve(timetable)
        })
    }
    catch (err) {
        return err
    }
    finally {
        await conn.end()
    }
}

export async function getFcmToken (uuid: number): Promise<string> {
    let conn: mariadb.PoolConnection | undefined
    conn = await pool.getConnection()
    try {
        let res = await conn.query("select fcm_token from User where uuid = ?", [uuid])
        return res[0].fcm_token
    }
    catch (err) {

    }
    finally {
        await conn.end()
    }
    return ''
}

export async function updateFcmToken (uuid: number, fcm_token: string) {
    let conn: mariadb.PoolConnection | undefined
    conn = await pool.getConnection()
    try {
        console.log(uuid, fcm_token)
        await conn.query("update User set fcm_token=? where uuid=?", [fcm_token, uuid])
    }
    catch (err) {
        // return err
    }
    finally {
        await conn.end()
    }
}

export async function updateTimeTable (uuid: number, timetable: Timetable): Promise<void> {
    let conn: mariadb.PoolConnection | undefined
    conn = await pool.getConnection()
    try {
        await conn.query("update Timetables set mon_period_1=? where uuid=?",[timetable.mon_period_1, uuid])
    }
    catch (err) {
        // return err
    }
    finally {
        await conn.end()
    }
}

export async function updatePassword (uuid: number, new_password: string) {
    let conn: mariadb.PoolConnection | undefined
    conn = await pool.getConnection()
    try {
        await conn.query("update User set password=? where uuid=?",[new_password, uuid])
    }
    catch (err) {
        // return err
    }
    finally {
        await conn.end()
    }
}