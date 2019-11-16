import template from './shortVacancy.pug';
import { Api } from '../../js/modules/api';
import Net from '../../js/modules/net';
import { Component } from '../../js/modules/Component';
import { VACANCY } from '../../js/modules/events';

export class ShortVacancyComponent extends Component {
  constructor ({vacancy = {}, isStatusMode = false, status, globalEventBus}={}) {
    if (vacancy['wage_from']){
      vacancy['wage_from'] = vacancy['wage_from'].split('.')[0];
    }
    if (vacancy['wage_to']){
      vacancy['wage_to'] = vacancy['wage_to'].split('.')[0];
    }
    super({ data: { ...vacancy, isStatusMode, status }, template, globalEventBus });
  }

  onFirstRender () {

    if (!this.data['is_favorite']) {
      let toFavorite = this.domElement.querySelector('[name="switch"]');
      console.log(toFavorite);
      toFavorite.addEventListener('click', this._onToFavorite.bind(this), true);
    }

    let logo = this.domElement.querySelector('.short-vacancy__logo ');
    Api.getEmployerById(this.data.owner_id)
      .then(res => {
        if (res.ok) {
          res.json().then(employer => {
            if (employer.path_to_img !== '' && employer.path_to_img !== 'default.jpg') {
              logo.setAttribute('src',`${Net.getServerURL()}/${employer.path_to_img}`);
            } else {
              logo.style.display = 'none';
            }
          });
        } else {
          logo.style.display = 'none';
        }
      })
      .catch(err => {
        logo.style.display = 'none';
        console.error(err);
      });

    this.respondButton = document.getElementById('respondToVacancyButton');
    if (this.respondButton) {
      this.respondButton.addEventListener('click', (ev) => {
        //TODO првоерять что отклик уже был дан
        this._globalEventBus.triggerEvent(VACANCY.chooseResume, {
          vacancyId: this.data.vacancyId
        });
      });
    }
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
      });
  }
  onRender () {
  }
}
