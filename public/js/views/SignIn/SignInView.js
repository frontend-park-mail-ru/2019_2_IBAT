import template from './signin.pug';
import { View } from '../../modules/view';
import Validation from '../../modules/validation';

export class SignInView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);
    this._eventBus.subscribeToEvent('signInFailed', this._onSubmitFailed.bind(this));
  }

  render (data = {}) {
    super.render(data);

    this._loginForm = this._root.querySelector('.login__form');
    this._loginForm.addEventListener('submit', this._onSubmit.bind(this), false);

    this.setValidationListeners();
  }

  setValidationListeners () {
    const login=this._loginForm.elements['login'];

    login.addEventListener("input", function (event) {
      const notValid = Validation.validateEmail(event.target.value, true);
      const error = event.target.nextElementSibling;
      if (Validation.isEmptyField(event.target.value) || !notValid) {
        event.target.className = "input";
        error.innerHTML = "";
        error.className = "error";
      } else {
        event.target.className = "input invalid";
        error.innerHTML = "Некорректный email";
      }
    }, false);
  }

  _onSubmitFailed (data) {
    const error = this._root.querySelector('.error-block');
    error.classList.add('error-block_login');
    error.innerHTML = `<p>${data.error}</p>`;
  }

  _onSubmit (ev) {
    ev.preventDefault();
    let wasfail = false;

    const inputs = this._loginForm.querySelectorAll('.input');
    inputs.forEach(input => {
      if (Validation.isEmptyField(input.value)) {
        const error = input.nextElementSibling;
        error.innerHTML = 'Обязательное поле';
        error.className = 'error active';
        input.className = 'input invalid';
        wasfail = true;
      } else {
        const error = input.nextElementSibling;
        error.innerHTML = '';
        error.className = 'error';
        input.className = 'input';
      }
    });

    if (wasfail) {
      password.value = '';
    } else {
      const user = {
        login: this._loginForm.elements['login'].value,
        password: this._loginForm.elements['password'].value
      };
      this._eventBus.triggerEvent('signIn', user);
    }
  }
}
