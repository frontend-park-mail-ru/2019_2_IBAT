import template from './foundVacancies.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacncy/ShortVacancy';

export class FoundVacanciesView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);
  }

  render (vacancies = []) {
    console.log(vacancies);
    let data = {
        'numOfVacancies': vacancies.length
    };
    console.log(data);
    super.render(data);

    const list = document.querySelector('.list');
    
    if (vacancies) {
      Object.entries(vacancies).forEach(([vacancyId, vacancy]) => {
        new ShortVacancyComponent({ vacancyId, vacancy }).appendToList(list);
      });
    }
  }
}
