import template from './resumePage.pug';
import { View } from '../../modules/view';
import { ACTIONS, RESUME } from '../../modules/events';
import { Api } from '../../modules/api';
import { PopupToConfirm } from '../../../components/PopupToConfirm/PopupToConfirm'
import Net from '../../modules/net';

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
    data.birth_date = new Date(data.birth_date).toDateString();
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
        this.data = { ...this.data, ...profileData.profile };
        this.data.path_to_img = `${Net.getServerImgURL()}/${this.data.path_to_img.split('/')[2]}`;
        super.render(this.data);
        return document.querySelector('.resume__owner-section');
      })
      .then(ownerSection => {
        if (ownerSection) {
          const changeButton = ownerSection.querySelector('.resume__owner-button_change');
          const deleteButton = ownerSection.querySelector('.resume__owner-button_delete');

          if (changeButton) {
            changeButton.addEventListener('click', this._onChange.bind(this), false);
          }
          if (deleteButton) {
            deleteButton.addEventListener('click', this._onDelete.bind(this), false);
          }
        }
      })
      .catch(error => {
        console.error(error);
        super.render(this.data);
      });
  }

  _onChange(event) {
    event.preventDefault();
    this.data.birth_date = new Date(this.data.birth_date).toISOString();
    this._globalEventBus.triggerEvent(ACTIONS.goTo, {path: '/createresume', data: this.data});
  }

  _onDelete(event) {
    event.preventDefault();
    // if (PopupToConfirm('Удаление резюме', 'Отменить удаление будет невозможно.',
    //   'Вы действительно хотите удалить резюме?','Удалить', 'Отменить')) {
    //     alert('OK');
    //   }
    if (confirm("Вы действительно хотите удалить резюме?")) {
      this._globalEventBus.triggerEvent(RESUME.deleteResume, this.data.id);
    }
  }
}
