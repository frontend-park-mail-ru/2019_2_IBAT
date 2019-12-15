import template from './resumePage.pug';
import { View } from '../../modules/view';
import { ACTIONS, RESUME } from '../../modules/events';
import { Api } from '../../modules/api';

export class ResumePageView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._globalEventBus.subscribeToEvent(RESUME.getResumeSuccess, this._onLoadResumeSuccess.bind(this));
  }

  render (data = {}) {
    this._globalEventBus.triggerEvent(RESUME.getResume, data.id);
  }

  /**
   * Получает данные авторизации(роль юзера) и запрашивает резюме
   * @param data
   * @private
   */
  _onAuthResponse (data) {
    if (this.isViewClosed) {
      return;
    }
    console.log(data);
    this._globalEventBus.triggerEvent(RESUME.getResume, this.data.id);
  }

  /**
   * Вызывается при успешном получении резюме
   * @param data
   * @private
   */
  _onLoadResumeSuccess (data) {
    this.data = data;
    Api.getProfile()
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.text);
        }
      })
      .then(profileData => {
        let my_id = profileData.profile.id;
        this.data = { ...this.data, my_id };
        super.render(this.data);
        return document.querySelector('.resume__owner-section');
      })
      .then(ownerSection => {
        const changeButton = ownerSection.querySelector('.resume__owner-button_change');
        const deleteButton = ownerSection.querySelector('.resume__owner-button_delete');

        if (changeButton) {
          changeButton.addEventListener('click', this._onChange.bind(this), false);
        }
        if (deleteButton) {
          deleteButton.addEventListener('click', this._onDelete.bind(this), false);
        }
      })
      .catch(error => {
        console.error(error);
        super.render(this.data);
      });
  }

  _onChange(event) {
    event.preventDefault();
    this.ro
    console.log(this.data);
    this._globalEventBus.triggerEvent(ACTIONS.goTo, {path: '/createresume', data: this.data});
  }

  _onDelete(event) {
    event.preventDefault();
  }
}
