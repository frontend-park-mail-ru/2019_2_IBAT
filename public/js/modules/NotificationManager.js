import { AUTH } from './events';
import { serverNotificationURL } from './net';
import { NotificationComponent } from '../../components/NotificationComponent/NotificationComponent';
import { Api } from './api';

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
    this.listen();

    // // WS соединение для получения уведомлений seeker (соискателю)
    // this.ws = new WebSocket(`${serverNotificationURL}`);
    //
    // this.ws.onopen = _ => {
    //   console.log('WebSocket соеденинение для уведомлений установлено');
    //   this.wsIsOpened = true;
    //   this.listen();
    // };
    //
    // this.ws.onerror = error => {
    //   console.log(`Websocket error ===> ${error}`);
    // };
    //
    // this.ws.onclose = event => {
    //   // 1000 - штатное закрытие сокета (коды WebSocket из 4х цифр)
    //   // 1001 - удалённая сторона исчезла
    //   // 1002 - ошибка протоколаindex.css
    //   // 1003 - неверный запрос
    //   console.log('Код: ' + event.code);
    //   console.log('Причина: ' + event.reason);
    //   this.wsIsOpened = false;
    // };
  }

  onDeleteWSConnection () {
    if (this.wsIsOpened) {
      this.ws.close(1001, 'User has logged out!');
    }
  }

  listen () {
    let notificationsList = window.document.querySelector('.list_notifications');
    if (!notificationsList) {
      notificationsList = document.createElement('div');
      notificationsList.classList.add('list', 'list_notifications', 'page__list_notifications');
  
      window.document.querySelector('.page').appendChild(notificationsList);
    }

    //TODO для дебага
    setTimeout(() => {
      const data = '{"id":"49355d24-f856-4b06-810e-6f627b3c849d"}';
      console.log(`Notification Received() ===> ${data}`);
      const vacancy=JSON.parse(data);

      Api.getVacancyById(vacancy.id)
        .then(res=>{
          if(res.ok){
            res.json().then(data=>{
              const notificationElement = new NotificationComponent(data, this._globalEventBus).appendTo(notificationsList);
              setTimeout(() => {
                notificationElement.remove();
              }, 5000);
            });
          }
        })
        .catch(error=>{
          console.error(error);
        });
    }, 2000);

    // this.ws.onmessage = event => {
    //   console.log(`Notification Received() ===> ${event.data}`);
      // const vacancy=JSON.parse(event.data);
    //
    //   Api.getVacancyById(vacancy.id))
    //     .then(res=>{
    //       if(res.ok){
    //         res.json().then(data=>{
    //           const notificationElement = new NotificationComponent(data, this._globalEventBus).appendTo(notificationsList);
    //           setTimeout(() => {
    //             notificationsList.removeChild(notificationElement);
    //           }, 5000);
    //         });
    //       }
    //     })
    //     .catch(error=>{
    //       console.error(error);
    //     });
    // };
  }
}
