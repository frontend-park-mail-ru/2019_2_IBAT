import template from './favoriteVacancies.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacancy/ShortVacancy';

export class FavoriteVacanciesView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);
  }

  render (vacancies = []) {
    console.log(vacancies);
    let data = {
      'number_of_vacancies': vacancies.length
    };
    super.render(data);

    const list = document.querySelector('.list');

    if (vacancies) {
      vacancies.forEach((vacancy) => {
        new ShortVacancyComponent(vacancy).appendTo(list);
      });
    }
  }
}
