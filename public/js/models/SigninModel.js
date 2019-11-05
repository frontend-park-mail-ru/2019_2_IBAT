import { Api } from '../modules/api';

export class SigninModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('signIn', this._onSignIn.bind(this));
  }

  _onSignIn (user) {
    Api.signIn(user)
      .then(res => {
        if (res.status === 200) {
          setItem('token', res.headers['X-CSRF-Tokene']);
          res.json().then(data => {
            this._eventBus.triggerEvent('signInSuccess', data);
          });
        } else {
          res.json().then(data => {
            this._eventBus.triggerEvent('signInFailed', data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

