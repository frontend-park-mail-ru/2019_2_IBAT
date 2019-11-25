import template from './shortVacancy.pug';
import { Api } from '../../js/modules/api';
import Net from '../../js/modules/net';
import { Component } from '../../js/modules/Component';
import { ACTIONS, VACANCY } from '../../js/modules/events';

export class ShortVacancyComponent extends Component {
  constructor ({ data = {}, globalEventBus } = {}) {
    super({ data, template, globalEventBus });
  }

  onFirstRender () {

    if (this.data.vacancy['wage_from']) {
      this.data.vacancy['wage_from'] = this.data.vacancy['wage_from'].split('.')[0];
    }
    if (this.data.vacancy['wage_to']) {
      this.data.vacancy['wage_to'] = this.data.vacancy['wage_to'].split('.')[0];
    }

    if (!this.data.vacancy.favorite) {
      const toFavorite = this.domElement.querySelector('[name="switch"]');
      console.log(toFavorite);
      toFavorite.addEventListener('click', this._onToFavorite.bind(this), true);
    }

    let logo = this.domElement.querySelector('.short-vacancy__logo ');
    Api.getEmployerById(this.data.vacancy.owner_id)
      .then(res => {
        if (res.ok) {
          res.json().then(employer => {
            if (employer.path_to_img !== '' && employer.path_to_img !== 'default.jpg') {
              logo.setAttribute('src', `${Net.getServerImgURL()}/${employer.path_to_img.split('/')[2]}`);
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

    if (!this.data.vacancy.is_responded) {
      this.respondButton = this.domElement.querySelector('[name="respond"]');

      this.respondButton.addEventListener('click', (ev) => {
        if (this.getRole.match(/Guest/)) {
          this._globalEventBus.triggerEvent(ACTIONS.guestSignInOnRespond, {
            vacancyId: this.data.vacancy.id
          });
        } else {
          this._globalEventBus.triggerEvent(VACANCY.chooseResume, {
            vacancyId: this.data.vacancy.id
          });
        }
      });
    }
  }

  _onToFavorite (event) {
    console.log(event);
    if (this.getRole.match(/Guest/)) {
      this._globalEventBus.triggerEvent(ACTIONS.guestSignInOnRespond, {
        vacancyId: this.data.vacancy.id
      });
    } else {
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
  }

  onRender () {
  }
}
