import { IndexView } from '../views/Index/IndexView';
import { AUTH } from '../modules/events';
import { SupportChatView, SupportChatView } from '../views/SupportChatView/SupportChatView';

export class SupportChatController {
  constructor (root, globalEventBus) {
    this._root = root;
    this._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));

  }

  start () {
    console.log('ChatController start()');
    this._globalEventBus.triggerEvent(AUTH.checkAuth);
    this._view = new SupportChatView(this._root, this._globalEventBus);
  }

  _onAuthResponse (data) {
    console.log('render()');

    if (data.role === 'support' || data.role === 'seeker' || data.role === 'employer') {
      this._view.render();
    }
  }
}
