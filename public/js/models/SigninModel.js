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
          res.headers.forEach(function(v, k) {
            console.log(k + ' -> ' + v); 
          });
          let token = res.headers.get('X-Csrf-Token');
          localStorage.setItem('token', token);
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

