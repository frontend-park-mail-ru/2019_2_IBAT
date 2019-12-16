import { AUTH, CHAT } from './events';
import { serverChatURL } from './net';
import { NotificationComponent } from '../../components/NotificationComponent/NotificationComponent';
import { chat_configs, MODES } from './chatConfig';

export class ChatManager {
  constructor (globalEventBus = {}) {
    this._globalEventBus = globalEventBus;
    this.wsIsOpened = false;

    this._globalEventBus.subscribeToEvent(CHAT.openWs, this.onCreateWSConnection.bind(this));
    this._globalEventBus.subscribeToEvent(CHAT.messageSent, this.send.bind(this));

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, () => {
      if (localStorage.getItem('role')) {
        this.onCreateWSConnection();
      }
    });
    this._globalEventBus.subscribeToEvent(AUTH.signOutResponse, () => {
      this.onDeleteWSConnection();
    });
  }

  onCreateWSConnection () {
    if (this.wsIsOpened) {
      return;
    }

    // WS соединение для получения уведомлений seeker (соискателю)
    this.ws = new WebSocket(`${serverChatURL}`);

    this.ws.onopen = _ => {
      console.log('WebSocket соеденинение для чата установлено');
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

  send (message) {
    console.log(`onSend() === > ${message}`);
    this.ws.send(message);
  }

  listen () {
    let notificationsList = window.document.querySelector('.list_notifications');
    if (!notificationsList) {
      notificationsList = document.createElement('div');
      notificationsList.classList.add('list', 'list_notifications', 'page__list_notifications');

      window.document.querySelector('.page').appendChild(notificationsList);
    }

    this.ws.onmessage = event => {
      console.log(`Chat Message Received() ===> ${event.data}`);
      const message = JSON.parse(event.data);

      if (chat_configs.getMode(message.chat_id) === MODES.notification || chat_configs.getMode(message.chat_id)===undefined) {
        const notification = {
          title: `Вам пришло новое сообщение от ${message.owner_name}`,
          link: `/chat/${message.chat_id}`,
        };
        const notificationElement = new NotificationComponent(
          notification, this._globalEventBus).appendTo(notificationsList);
        setTimeout(() => {
          notificationElement.remove();
        }, 5000);
      }
      if (chat_configs.getMode(message.chat_id) === MODES.chat) {
        this._globalEventBus.triggerEvent(CHAT.messageReceived, message);
      }
    };
  }
}
