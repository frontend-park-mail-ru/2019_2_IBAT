import template from './header.pug';
import { View } from '../../modules/view';
import { AUTH } from '../../modules/events';

export class HeaderView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
  }

  render (data = {}) {
    super.render(data);
  }

  _onAuthResponse (data) {
    super.render(data);

    const signOutButton = this._root.querySelector('input[name=signOut]');
    if (signOutButton) {
      signOutButton.addEventListener('click', (ev) => {
        this._globalEventBus.triggerEvent('signOut');
      });
    }
  }
}

