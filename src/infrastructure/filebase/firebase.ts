const admin = require('firebase-admin')
import * as serviceAccount from "./anpikakunin.json"
// const serviceAccount = require("./anpikakunin.json")


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const messaging = admin.messaging()


export async function pushNotification(
                            notification: { title: string, body: string },
                            data: { Nick: string, Room: string },
                            fcm_tokens: [string]) {
    const message = {
        notification: {
            title: notification.title,
            body: notification.body,
        },
        data: {
            Nick: data.Nick,
            Room: data.Room,
        },
        tokens: fcm_tokens
    }

    await messaging.sendMulticast(message)
}
