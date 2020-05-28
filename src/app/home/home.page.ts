import { Component } from '@angular/core';
import { Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  i = 0;
  notifications: any = [];

  ngOnInit() {
    console.log('ng init');

    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log('token ' + token.value);
    });
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('error on register ' + JSON.stringify(error));
    });
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      console.log('notification ' + JSON.stringify(notification));
      this.notifications.push(notification);
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      console.log('notification ' + JSON.stringify(notification));
      this.notifications.push(notification);
    });
  }

  async register() {
    const permResult = await PushNotifications.requestPermission();
    if (permResult.granted) {
      // Register with Apple / Google to receive push via APNS/FCM
      const result = await PushNotifications.register();
      console.log('register result', result);
    } else {
      alert(`push notifications won't work`);
    }
  }


  async getNotifs() {
    const notifs = await PushNotifications.getDeliveredNotifications();
    console.log('notifs',notifs);
  }

  async removeNotifs() {
    const notifs = await PushNotifications.getDeliveredNotifications();
    const result = await PushNotifications.removeDeliveredNotifications(notifs);
    console.log('remove',result);
  }

  async removeAllNotifs() {
    const result = await PushNotifications.removeAllDeliveredNotifications();
    console.log('remove all',result);
  }
}
