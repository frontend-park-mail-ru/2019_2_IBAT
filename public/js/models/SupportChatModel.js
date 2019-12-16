import { SUPPORT_CHAT } from '../modules/events';
import { serverSupportChatURL } from '../modules/net';

class SupportChatModel {
  setGlobalEventBus (globalEventBus) {
    this._globalEventBus = globalEventBus;
    window._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(SUPPORT_CHAT.send, this._onSend.bind(this));

    this.ws = new WebSocket(serverSupportChatURL);

    this.ws.onopen = _ => {
      console.log('Соеденинение установлено');
      this._globalEventBus.triggerEvent(SUPPORT_CHAT.ws_opened);
      this.listen();
    };

    this.ws.onerror = error => {
      console.log(`Websocket error ===> ${error}`);
    };

    this.ws.onclose = event => {
      // 1000 - штатное закрытие сокета (коды WebSocket из 4х цифр)
      // 1001 - удалённая сторона исчезла
      // 1002 - ошибка протокола
      // 1003 - неверный запрос
      console.log('Код: ' + event.code);
      console.log('Причина: ' + event.reason);
    };
  }

  _onSend (message) {
    console.log(`onSend() === > ${message}`);
    this.ws.send(message);
  }

  listen () {
    this.ws.onmessage = event => {
      console.log(`Chat Received() ===> ${event.data}`);

      this._globalEventBus.triggerEvent(SUPPORT_CHAT.receive, event.data);
    };
  }
}

export default new SupportChatModel();
