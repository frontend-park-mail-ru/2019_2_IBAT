import { Controller } from '../modules/controller';
import { ChatApp } from '../views/ChatView/ChatApp';

export class ChatController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);
    this.app = new ChatApp(globalEventBus);
  }

  openWithData (data = {}) {
    this.app.renderTo(this._root);
  }

  close () {
    this._root.innerHTML = '';
  }
}
