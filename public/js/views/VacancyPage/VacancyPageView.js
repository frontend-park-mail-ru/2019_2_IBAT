import template from './vacancyPage.pug';
import { View } from '../../modules/view';

export class VacancyPageView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);

    this._eventBus.subscribeToEvent('loadVacancySuccess', this._onLoadVacancySuccess.bind(this));
  }

  render (data = {}) {
    this._eventBus.triggerEvent('loadVacancy', data);
    // super.render(data);
  }

  _onLoadVacancySuccess(data){
    super.render(data);
  }
}
