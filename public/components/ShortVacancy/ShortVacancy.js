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
      if (toFavorite) {
        toFavorite.addEventListener('click', this._onToFavorite.bind(this), true);
      }
    }

    let logo = this.domElement.querySelector('.short-vacancy__logo ');
    logo.style.display = 'none';

    // Эта дичь тупо дудосит бэк, и на главной странице мы наблюдаем нихера:)
    // Api.getEmployerById(this.data.vacancy.owner_id)
    //   .then(res => {
    //     if (res.ok) {
    //       res.json().then(employer => {
    //         if (employer.path_to_img !== '' && employer.path_to_img !== 'default.jpg') {
    //           logo.setAttribute('src', `${Net.getServerImgURL()}/${employer.path_to_img.split('/')[2]}`);
    //         } else {
    //           logo.style.display = 'none';
    //         }
    //       });
    //     } else {
    //       logo.style.display = 'none';
    //     }
    //   })
    //   .catch(err => {
    //     logo.style.display = 'none';
    //     console.error(err);
    //   });

    if (!this.data.vacancy.is_responded) {
      this.respondButton = this.domElement.querySelector('[name="respond"]');
      if (this.respondButton) {
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

    this.employerLink.addEventListener('click', ev=>{
      this._globalEventBus.triggerEvent(ACTIONS.goTo, {path: `/employer/${this.data.vacancy.owner_id}`});
      ev.stopPropagation();
    });
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

  get employerLink(){
    return this.domElement.querySelector('.js-employer-link');
  }


  onRender () {
  }
}
