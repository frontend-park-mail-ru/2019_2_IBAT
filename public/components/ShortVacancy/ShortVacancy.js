import template from './shortVacancy.pug';
import { Api } from '../../js/modules/api';
import Net from '../../js/modules/net';

export class ShortVacancyComponent {
  constructor (vacancy = {}, isStatusMode = false, status = {}) {
    this._vacancy = vacancy;
    this._vacancy['wage_from'] = this._vacancy['wage_from'].split('.')[0];
    this._vacancy['wage_to'] = this._vacancy['wage_to'].split('.')[0];

    this._vacancyCard = document.createElement('div');
    this._vacancyCard.className = 'card';
    this._vacancyCard.innerHTML = template({ ...this._vacancy, isStatusMode, status });

    let logo = this._vacancyCard.querySelector('.short-vacancy__logo ');
    Api.getEmployerById(this._vacancy.owner_id)
      .then(res => {
        if (res.ok) {
          res.json().then(employer => {
            if (employer.path_to_img !== '' && employer.path_to_img !== 'default.jpg') {
              logo.setAttribute('src',`${Net.getServerURL()}/${employer.path_to_img}`);
            } else {
              logo.style.display = 'none';
            }
          });
        }
        else{
          logo.style.display = 'none';
        }
      })
      .catch(err => {
        logo.style.display = 'none';
        console.error(err);
      });
  }

    appendToList(list) {
        list.appendChild(this._vacancyCard);
    }
}
