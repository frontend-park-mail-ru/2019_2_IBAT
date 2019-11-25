import template from './chatView.pug';
import { View } from '../../modules/view';
import { AUTH, CHAT } from '../../modules/events';

export class ChatView extends View {
  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
  }

  render () {
    console.log('render()');
    super.render();
  }

  onRender () {
    this._globalEventBus.subscribeToEvent(CHAT.receive, (message) => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message_other');
      messageElement.innerHTML = `${message}`;
      this.chat.appendChild(messageElement);
    });

    const sendButton = this._root.querySelector('.js-message-send');
    sendButton.addEventListener('click', ev => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message_my');
      messageElement.innerHTML = `${this.messageInput.value}`;

      this.chat.appendChild(messageElement);

      this._globalEventBus.triggerEvent(CHAT.send, this.messageInput.value);
      this.messageInput.value = '';
    });
  }

  get messageInput () {
    return this._root.querySelector('.js-message-input');
  }

  get chat () {
    return this._root.querySelector('.chat__content');
  }
}
