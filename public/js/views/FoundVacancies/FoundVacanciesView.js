import template from './foundVacancies.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacancy/ShortVacancy';
import { AUTH } from '../../modules/events';

export class FoundVacanciesView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
  }

  render (vacancies = []) {
    let data = {
      'numOfVacancies': vacancies.length
    };
    this._globalEventBus.triggerEvent(AUTH.checkAuth);

    super.render(data);

    const list = document.querySelector('.list');

    if (vacancies) {
      Object.entries(vacancies).forEach(([vacancyId, vacancy]) => {
        new ShortVacancyComponent({ vacancyId, vacancy }).appendToList(list);
      });
    }
  }
}
