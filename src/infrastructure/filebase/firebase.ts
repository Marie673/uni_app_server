import bodyParser from "body-parser";

const admin = require('firebase-admin')
const serviceAccount = require("./anpikakuninproject-firebase-adminsdk-k8ej5-2594dee450.json")
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

