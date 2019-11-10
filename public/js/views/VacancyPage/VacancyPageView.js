import template from './vacancyPage.pug';
import { View } from '../../modules/view';

export class VacancyPageView extends View {

  constructor (root, eventBus, globalEventBus) {
    super(root, template, eventBus, globalEventBus);

    this._eventBus.subscribeToEvent('loadVacancySuccess', this._onLoadVacancySuccess.bind(this));
    this._globalEventBus.subscribeToEvent('getRoleFromHeaderResponse', this._onGetRole.bind(this));
  }

  render (data = {}) {
    this._eventBus.triggerEvent('loadVacancy', data.id);
  }

  _onGetRole (role) {
    this._data = { role: role, ...this._data };
    super.render(this._data);

    this.postRender();
  }

  postRender () {
    this.respondButton = document.getElementById('respondToVacancyButton');
    this.respondButton.addEventListener('click', (ev) => {
      //TODO првоерять что отклик уже был дан
      this._eventBus.triggerEvent('respondToVacancy', {
        vacancyId: document.location.pathname.split('/').pop()
      });
    });
  }

  _onLoadVacancySuccess (data) {
    this._data = data;
    this._globalEventBus.triggerEvent('getRoleFromHeader');
  }
}
