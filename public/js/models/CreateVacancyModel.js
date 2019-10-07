import { Api } from '../modules/api';

export class CreateVacancyModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('createVacancy', this._onCreateVacancy.bind(this));
  }

  _onCreateVacancy (vacancy) {
    Api.createVacancy(vacancy)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this._eventBus.triggerEvent('createSuccess', data);
          });
        } else {
          response.json().then(data => {
            this._eventBus.triggerEvent('createFailed', data);
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

