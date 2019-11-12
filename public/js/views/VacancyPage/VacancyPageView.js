import template from './vacancyPage.pug';
import { View } from '../../modules/view';
import { AUTH, VACANCY } from '../../modules/events';

export class VacancyPageView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.getVacancySuccess, this._onGetVacancySuccess.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.getVacancyFailed, this._onGetVacancyFailed.bind(this));
  }

  render (data = {}) {
    super.render(this._data);

    this._globalEventBus.triggerEvent(AUTH.checkAuth);
    this._data = data;
  }

  /**
   * Получает данные авторизации(роль юзера) и запрашивает вакансию
   * @param data
   * @private
   */
  _onAuthResponse (data) {
    if (this.isViewClosed) {
      return;
    }
    this._data = { role: data.role, ...this._data };

    this._globalEventBus.triggerEvent(VACANCY.getVacancy, this._data.id);
  }

  /**
   * Получает конкретную вакансию от модели и ставит слушатель на "Откликнуться"
   * @param data
   * @private
   */
  _onGetVacancySuccess (data) {
    this._data = { ...data, ...this._data };

    super.render(this._data);

    this.respondButton = document.getElementById('respondToVacancyButton');
    if (this.respondButton) {
      this.respondButton.addEventListener('click', (ev) => {
        //TODO првоерять что отклик уже был дан
        this._globalEventBus.triggerEvent(VACANCY.chooseResume, {
          vacancyId: document.location.pathname.split('/').pop()
        });
      });
    }
  }

  /**
   * Вызывется при ошибке получения вакансии
   * @param error
   * @private
   */
  _onGetVacancyFailed (error) {
    //
  }
}
