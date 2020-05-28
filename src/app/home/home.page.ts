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
    const result = await PushNotifications.register();
    console.log(result);
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
