import { CHAT } from '../modules/events';
import { serverChatURL } from '../modules/net';

class ChatModel {
  setGlobalEventBus (globalEventBus) {
    this._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(CHAT.send, this._onSend.bind(this));
    this._globalEventBus.subscribeToEvent(CHAT.receive, this._onReceive.bind(this));

    this.ws = new WebSocket(serverChatURL);

    this.ws.onopen = _ => {
      console.log('Соеденинение установлено');
      this._globalEventBus.triggerEvent(CHAT.ws_opened);
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
    ws.send(message);
  }

  _onReceive () {
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      console.log(`Chat Received() ===> ${message}`);

      this._globalEventBus.triggerEvent(CHAT.receive, message);
    };
  }

}

window.chatModel=new ChatModel();
export default new ChatModel();
