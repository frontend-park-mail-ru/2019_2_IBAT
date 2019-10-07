import template from './index.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacncy/ShortVacancy';

export class IndexView extends View {

  constructor (root, eventBus, globalEventBus) {
    super(root, template, eventBus, globalEventBus);

    this._eventBus.subscribeToEvent('getVacanciesSuccess', this._onGetVacanciesSuccess.bind(this));
  }

  render (data = {}) {
    super.render(data);

    this._role=this._globalEventBus.triggerEvent('getRoleFromHeader');
    this._eventBus.triggerEvent('getVacancies');
  }

  _onGetVacanciesSuccess(vacancies){
    const list = document.createElement('div');
    list.className='list';
    this._root.appendChild(list);

    if (vacancies) {
      for (const [vacancyId,vacancy] of Object.entries(vacancies)) {
        new ShortVacancyComponent({vacancyId, vacancy}).appendToList(list);
      }
    }
  }
}
