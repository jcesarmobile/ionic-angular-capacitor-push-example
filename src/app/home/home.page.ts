import { Component } from '@angular/core';
import { Plugins, PushNotification, PushNotificationToken } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ngOnInit() {
    console.log('ng init');
    PushNotifications.register();
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log('token ' + token.value);
    });
    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('error on register ' + JSON.stringify(error));
    });
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      console.log('notification ' + JSON.stringify(notification));
    });
  }
}
