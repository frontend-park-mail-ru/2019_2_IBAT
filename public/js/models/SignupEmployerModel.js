import { Api } from '../modules/api';

export class SignupEmployerModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('signUp', this._onSignUp.bind(this));
  }

  _onSignUp (user) {
    Api.signUpEmployer(user)
      .then(res => {
        if (res.status === 200) {
          setItem('token', res.headers['X-CSRF-Tokene']);
          res.json().then(data => {
            this._eventBus.triggerEvent('signUpSuccess', data);
          });
        } else {
          res.json().then(data => {
            this._eventBus.triggerEvent('signUpFailed', data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

