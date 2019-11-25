import template from './resumePage.pug';
import { View } from '../../modules/view';
import { AUTH, RESUME } from '../../modules/events';

export class ResumePageView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
    this._globalEventBus.subscribeToEvent(RESUME.getResumeSuccess, this._onLoadResumeSuccess.bind(this));
  }

  render (data = {}) {
    super.render(data);

    this._globalEventBus.triggerEvent(AUTH.checkAuth);
    this.data = data;

    this._globalEventBus.triggerEvent(RESUME.getResume, data);
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

    this._globalEventBus.triggerEvent(RESUME.getResume, this.data.id);
  }

  /**
   * Вызывается при успешном получении резюме
   * @param data
   * @private
   */
  _onLoadResumeSuccess (data) {
    this.data = { ...data, ...this.data };

    super.render(data);
  }
}
