import { Api } from '../modules/api';

export class VacancyPageModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('loadVacancy', this._loadVacancy.bind(this));
  }

  _loadVacancy (id) {
    Api.getVacancyById(id)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this._eventBus.triggerEvent('loadVacancySuccess', data);
          });
        } else {
          response.json().then(data => {
            this._eventBus.triggerEvent('loadVacancyFailed', data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onSignOut () {
    Api.signOut()
      .then(res => {
        if (res.ok) {
          this._eventBus.triggerEvent('signOutResponse');
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}

