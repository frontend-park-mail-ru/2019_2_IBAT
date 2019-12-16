import { CHAT, SUPPORT_CHAT } from '../modules/events';
import Net from '../modules/net';

class ChatModel {
  setGlobalEventBus (globalEventBus) {
    this._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(CHAT.getChatHistory, this._onGetChatHistory.bind(this));
    this._globalEventBus.subscribeToEvent(CHAT.getChats, this._onGetChats.bind(this));
  }

  _onGetChatHistory (id) {
    Net.doGet({ url: `/chat/history/${id}` })
      .then(response => {
        response.json().then(data => {
          if (response.ok) {

            data.forEach(message=>{
              message.created_at=new Date(message.created_at);
            });

            this._globalEventBus.triggerEvent(CHAT.getChatHistorySuccess, data);
          } else {
            this._globalEventBus.triggerEvent(CHAT.getChatHistoryFailed, data);
          }
        });
      })
      .catch(err => {
        console.error(err);
        this._globalEventBus.triggerEvent(CHAT.getChatHistoryFailed, err);
      });
  }

  _onGetChats () {
    Net.doGet({ url: '/chat/list' })
      .then(response => {
        response.json().then(data => {
          if (response.ok) {
            this._globalEventBus.triggerEvent(CHAT.getChatsSuccess, data);
          } else {
            this._globalEventBus.triggerEvent(CHAT.getChatsFailed, data);
          }
        });
      })
      .catch(err => {
        console.error(err);
        this._globalEventBus.triggerEvent(CHAT.getChatHistoryFailed, err);
      });
  }
}

export default new ChatModel();
