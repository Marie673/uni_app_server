import {getFcmToken} from "../mariadb/testdb";

const admin = require('firebase-admin')
const serviceAccount = require("./anpikakuninproject-firebase-adminsdk-k8ej5-2594dee450.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
 })
const messaging = admin.messaging()

const test_token = [
    'ebY4S9DBSFGoMFO-kP7uVB:APA91bHwSPROjTLXdy7VGBA_M4OZYgQfdhZsxgqX1iPod247wbUPWiYjQbYFMtDGModVnCDOokf9oi-zPwU1Vz8ZSkaDA_tEFtvU5ZlaMtVLd3UaY8gcQUjBlk-WpCox7JQR2mgwBNJ5',
    'epkUXbPATCm_mFzkn1UMcq:APA91bEo3FXBoqzr6s756Q4jehNERpo5iiU3sQhtAUX5es9eet87xN8CyEuTw8m09fq5TiekVAgU1pdjdx28r38qnlUEl_6sOlFbpMZ5hiacxxJPl6HP81AvPYBVaplm7oMatEm6InGI',
    'fV9rdHUSSGW7giwQa2I0cp:APA91bGZ0-rsedmeENic4_LA-emDLUkftq4F77VKj6tQqux448iH8P2TtugDGRbTP8FvmjMcMLMIXKOXULkF-f2m8MmwRbfqvN0EiYq8rlMK6OGuH5p0bNEtwsTBLdMe0p8GYGBEbErQ',
]

export async function testPushNotification(): Promise<void> {
    const message = {
        notification:{
            title: "檜山はフォアグラウンドに苦戦中",
            body: "頑張れ"
        },
        data: {
            Nick: "のこぴ",
            Room: "5階のどこか"
        },
        tokens: test_token
    }
    await messaging.sendMulticast(message)
     return
}
export async function testPushNotification1(uuid: number): Promise<void> {
    let token = await getFcmToken(uuid)
    console.log(token)
    const message = {
        notification:{
            title: "檜山はフォアグラウンドに苦戦中",
            body: "頑張れ"
        },
        data: {
            Nick: "のこぴ",
            Room: "5階のどこか"
        },
        token: token
    }
    await messaging.send(message)
    return
}
