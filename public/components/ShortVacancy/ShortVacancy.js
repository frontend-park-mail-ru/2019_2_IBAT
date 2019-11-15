import template from './shortVacancy.pug';
import { Api } from '../../js/modules/api';
import Net from '../../js/modules/net';

export class ShortVacancyComponent {
  constructor (vacancy = {}, isStatusMode = false, status) {
    this._vacancy = vacancy;
    console.log(vacancy);
    if (this._vacancy['wage_from']){
      this._vacancy['wage_from'] = this._vacancy['wage_from'].split('.')[0];
    }
    if (this._vacancy['wage_to']){
      this._vacancy['wage_to'] = this._vacancy['wage_to'].split('.')[0];
    }

    this._vacancyCard = document.createElement('div');
    this._vacancyCard.innerHTML = template({ ...this._vacancy, isStatusMode, status });

    if (!this._vacancy['is_favorite']) {
      let toFavorite = this._vacancyCard.querySelector('[name="switch"]');
      console.log(toFavorite);
      toFavorite.addEventListener('click', this._onToFavorite.bind(this), true);
    }

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

  _onToFavorite(event) {
    console.log(event);
    let link = event.currentTarget;
    Api.addFavoriteVacancy(link.id)
      .then(res => {
        if (res.ok) {
          link.classList.add('short-vacancy__favorite_selected');
          link.removeEventListener('click', this._onToFavorite.bind(this));
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  appendToList(list) {
      list.appendChild(this._vacancyCard);
  }
}
