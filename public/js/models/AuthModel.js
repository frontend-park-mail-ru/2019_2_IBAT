import { Api } from '../modules/api';
import { AUTH } from '../modules/events';

class AuthModel {

  setGlobalEventBus (globalEventBus) {
    this._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(AUTH.checkAuth, this._onCheckAuth.bind(this));
    this._globalEventBus.subscribeToEvent(AUTH.signOut, this._onSignOut.bind(this));
    this._globalEventBus.subscribeToEvent(AUTH.signIn, this._onSignIn.bind(this));
    this._globalEventBus.subscribeToEvent(AUTH.signUpSeeker, this._onSignUpSeeker.bind(this));
    this._globalEventBus.subscribeToEvent(AUTH.signUpEmployer, this._onSignUpEmployer.bind(this));
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
      .then(data => {
        this.data = { ...this.data, role: data.role };
        if(data.role){

          localStorage.setItem('role', data.role);
        }
        this._globalEventBus.triggerEvent(AUTH.checkAuthResponse);
      })
      .catch(error => {
        console.log(error);
      });
  }

  _onSignOut () {
    Api.signOut()
      .then(res => {
        if (res.ok) {
          this.data.role = undefined;
          this._globalEventBus.triggerEvent(AUTH.signOutResponse);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  _onSignIn (user) {
    Api.signIn(user)
      .then(res => {
        if (res.status === 200) {
          res.headers.forEach(function (v, k) {
            console.log(k + ' -> ' + v);
          });
          let token = res.headers.get('X-Csrf-Token');
          localStorage.setItem('token', token);
          res.json().then(data => {
            this._globalEventBus.triggerEvent(AUTH.signInSuccess, data);
          });
        } else {
          res.json().then(data => {
            this._globalEventBus.triggerEvent(AUTH.signInFailed, data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onSignUpSeeker (user) {
    Api.signUpSeeker(user)
      .then(res => {
        if (res.status === 200) {
          let token = res.headers.get('X-Csrf-Token');
          localStorage.setItem('token', token);
          res.json().then(data => {
            this._globalEventBus.triggerEvent(AUTH.signUpSuccess, data);
          });
        } else {
          res.json().then(data => {
            this._globalEventBus.triggerEvent(AUTH.signUpFailed, data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onSignUpEmployer (user) {
    Api.signUpEmployer(user)
      .then(res => {
        if (res.status === 200) {
          let token = res.headers.get('X-Csrf-Token');
          localStorage.setItem('token', token);
          res.json().then(data => {
            this._globalEventBus.triggerEvent(AUTH.signUpSuccess, data);
          });
        } else {
          res.json().then(data => {
            this._globalEventBus.triggerEvent(AUTH.signUpFailed, data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default new AuthModel();
