import template from './employerPage.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacancy/ShortVacancy';
import { Api } from '../../modules/api';

export class EmployerPageView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
  }

  render (data = {}) {
    console.log(data);
    super.render(data);
    const list = document.querySelector('.company__vacancies-list');

    if (data.vacancies.length) {
      let request = '/vacancies?';
      data.vacancies.forEach((vacancyId, i) =>{
        request += `id${i}=${vacancyId}&`;
      });
      
      Api.searchVacancies(request)
        .then(res => {
          if (res.ok) {
            res.json()
              .then(vacancies => {
                vacancies.forEach(vacancy => {
                  new ShortVacancyComponent({ data: { vacancy: vacancy }, globalEventBus: this._globalEventBus }).appendTo(list);
                });
              })
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      let info = document.createElement('p');
      info.innerHTML = 'У компании нет активных вакансий';
      list.appendChild(info);
    }
  }
}
