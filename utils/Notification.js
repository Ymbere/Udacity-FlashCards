import { Notifications, Permissions } from "expo";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = "Notification:key"

export function clearLocalNotification () {
    console.log("Clearing Scheduled notification")
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(() => Notifications.cancelAllScheduledNotificationsAsync())
}

const notification = {
    title: "It's time to Train your brain",
    body: "Don't forget to train with your Flash Cards",
    ios : {
        sound: true
    },
    android: {
        sound: true,
        priority: "high",
        sticky: false,
        vibrate: true,
    }
}

export async function setLocalNotification () {
    console.log("Scheduling notification")

    data = await AsyncStorage.getItem(NOTIFICATION_KEY)
    console.log("NOTIFICATION_KEY: " + JSON.stringify(data))

    if (data === null) {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        console.log("Notification STATUS: " + JSON.stringify(status))
        if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            let tomorrow = new Date()

            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(2)

            Notifications.scheduleLocalNotificationAsync(
                notification,
                {
                    time: tomorrow,
                    repeat: 'day'
                }
            )
            console.log("Scheduled for " + JSON.stringify(tomorrow.toString()))
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(tomorrow.toString()))
        }
    }
}
