import { IndexView } from '../views/Index/IndexView';
import { AUTH } from '../modules/events';

export class ChatController {
  constructor (root, globalEventBus) {
    this._root = root;
    this._globalEventBus = globalEventBus;

    globalEventBus.triggerEvent(AUTH.checkAuth, this._onAuthResponse.bind(this));
    this._view = new IndexView(this._root, this._globalEventBus);
  }

  _onAuthResponse (data) {
    if (data.role === 'support') {
      this._view = new ChatView(this._root, this._globalEventBus);
    } else if (data.role === 'seeker' || data.role === 'employer') {
      this._view = new SupportChatView(this._root, this._globalEventBus);
    } else {
      window.location = '/';
    }
  }
}
