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

  /**
   * Получает данные авторизации с модели и обновляет headerView
   * @param data
   * @private
   */
  _onAuthResponse (data) {
    super.render(data);

    const signOutButton = this._root.querySelector('div[id=signOut]');
    const profileMenuButton = this._root.querySelector('button[name=profile-menu]');

    if (profileMenuButton) {
      profileMenuButton.addEventListener('click', _ => {
        //TODO для верстки, если какие-то элементы меняют свое состояние то с одного, то на другое, использовать toggle() теперь
        this._root.querySelector('.dropdown').classList.toggle('dropdown_show');
      });
    }

    window.onclick = _ => {
      if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.getElementsByClassName('dropdown');
        Array.from(dropdowns).forEach(dropdown => {
          if (dropdown.classList.contains('dropdown_show')) {
            dropdown.classList.remove('dropdown_show');
          }
        });
      }
    };

    if (signOutButton) {
      signOutButton.addEventListener('click', _ => {
        this._globalEventBus.triggerEvent(AUTH.signOut);
      });
    }
  }
}

