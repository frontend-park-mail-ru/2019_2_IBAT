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
    this._data = data;

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
    this._data = { role: data.role, ...this._data };

    this._globalEventBus.triggerEvent(RESUME.getResume, this._data.id);
  }

  /**
   * Вызывается при успешном получении резюме
   * @param data
   * @private
   */
  _onLoadResumeSuccess (data) {
    this._data = { ...data, ...this._data };

    super.render(data);
  }
}
