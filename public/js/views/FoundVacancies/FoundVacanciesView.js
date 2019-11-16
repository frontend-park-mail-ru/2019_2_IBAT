import template from './foundVacancies.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacancy/ShortVacancy';
import { AUTH } from '../../modules/events';


export class FoundVacanciesView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
  }

  render (vacancies = {}) {
    // Если мы пришли сюда из поиска, то это массив, а если мы вернулись назад на найденные
    // то вакансии не прокинутся и мы отрендерим старые(чтобы по 500 раз не искать одно и тоже)
    if (Array.isArray(vacancies)) {
      this._vacancies = vacancies;
    }
    
    let data = {
      'number_of_vacancies': this._vacancies.length
    };

    super.render(data);

    const list = document.querySelector('.list');

    if (this._vacancies.length > 0) {
      this._vacancies.forEach(vacancy => {
        new ShortVacancyComponent(vacancy).appendToList(list);
      });
    }
  }
}
