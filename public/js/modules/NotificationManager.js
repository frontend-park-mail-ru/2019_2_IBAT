import { AUTH } from './events';
import { serverNotificationURL } from './net';
import { NotificationComponent } from '../../components/NotificationComponent/NotificationComponent';

export class NotificationManager {
  constructor (globalEventBus = {}) {
    this._globalEventBus = globalEventBus;
    this.wsIsOpened = false;

    this._globalEventBus.subscribeToEvent(AUTH.signInSuccess, this.onCreateWSConnection.bind(this));
    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this.onCreateWSConnection.bind(this));
    this._globalEventBus.subscribeToEvent(AUTH.signOut, this.onDeleteWSConnection.bind(this));
  }

  onCreateWSConnection () {
    if (this.wsIsOpened || localStorage.getItem('role') !== 'seeker') {
      return;
    }

    //TODO для дебага
    // this.listen();

    // WS соединение для получения уведомлений seeker (соискателю)
    this.ws = new WebSocket(`${serverNotificationURL}`);

    this.ws.onopen = _ => {
      console.log('WebSocket соеденинение для уведомлений установлено');
      this.wsIsOpened = true;
      this.listen();
    };

    this.ws.onerror = error => {
      console.log(`Websocket error ===> ${error}`);
    };

    this.ws.onclose = event => {
      // 1000 - штатное закрытие сокета (коды WebSocket из 4х цифр)
      // 1001 - удалённая сторона исчезла
      // 1002 - ошибка протоколаindex.css
      // 1003 - неверный запрос
      console.log('Код: ' + event.code);
      console.log('Причина: ' + event.reason);
      this.wsIsOpened = false;
    };
  }

  onDeleteWSConnection () {
    if (this.wsIsOpened) {
      this.ws.close(1001, 'User has logged out!');
    }
  }

  listen () {
    const notificationsList = document.createElement('div');
    notificationsList.classList.add('list', 'list_notifications', 'page__list_notifications');

    window.document.querySelector('.page').appendChild(notificationsList);

    //TODO для дебага
    // setTimeout(() => {
    //   const data = {
    //     title: 'Hello!!!',
    //     text: '111111111111111111111111111111111111111111!',
    //     vacancyId: '3d85c235-769a-46cf-9f21-c14daac53139'
    //   };
    //   console.log(`Notification Received() ===> ${data}`);
    //
    //   const notificationElement = new NotificationComponent(data, this._globalEventBus).appendTo(notificationsList);
    //   // setTimeout(()=>{
    //   //   notificationsList.removeChild(notificationElement);
    //   // },3000);
    // }, 2000);
    //
    // setTimeout(() => {
    //   const data = {
    //     title: 'Hello!!!',
    //     text: '22222222222222222222222222222222222222222!',
    //     vacancyId: '3d85c235-769a-46cf-9f21-c14daac53139'
    //   };
    //   console.log(`Notification Received() ===> ${data}`);
    //
    //   const notificationElement = new NotificationComponent(data, this._globalEventBus).appendTo(notificationsList);
    //   // setTimeout(()=>{
    //   //   notificationsList.removeChild(notificationElement);
    //   // },5000);
    // }, 1000, 3);

    this.ws.onmessage = event => {
      console.log(`Notification Received() ===> ${event.data}`);

      const notificationElement = new NotificationComponent(event.data, this._globalEventBus).appendTo(notificationsList);
      setTimeout(() => {
        notificationsList.removeChild(notificationElement);
      }, 5000);
    };
  }
}
