import { Api } from '../modules/api';

export class HeaderModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
    this._eventBus.subscribeToEvent('signOut', this._onSignOut.bind(this));
  }

  _onCheckAuth () {
    Api.checkSession()
      .then(response => {
        if (response.status === 401 || response.ok) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then(body => {
        this._eventBus.triggerEvent('checkAuthResponse', body);
      })
      .catch(error => {
        console.log(error);
      });
  }

  _onSignOut(){
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

