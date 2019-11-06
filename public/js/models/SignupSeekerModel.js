import { Api } from '../modules/api';

export class SignupSeekerModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('signUp', this._onSignUp.bind(this));
  }

  _onSignUp (user) {
    Api.signUpSeeker(user)
      .then(res => {
        if (res.status === 200) {
          res.headers.forEach(function(v, k) {
            console.log(k + ' -> ' + v); 
          });
          let token = res.headers.get('X-Csrf-Token');
          localStorage.setItem('token', token);
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

