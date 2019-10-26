import template from './signin.pug';
import { View } from '../../modules/view';
import Validation from '../../modules/validation';

export class SignInView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);
    this._eventBus.subscribeToEvent('signInFailed', this._onSubmitFailed.bind(this));
  }

  render(data = {}) {
    super.render(data);

    this._loginForm = this._root.querySelector('.login__form-js');
    this._loginForm.addEventListener('submit', this._onSubmit.bind(this), false);

    this.setValidationListeners();
  }

  setValidationListeners() {
    const email = this._loginForm.elements['email'];

    email.addEventListener(
      'input',
      function(event) {
        const notValid = Validation.validateEmail(event.target.value, true);
        const error = event.target.nextElementSibling;
        if (Validation.isEmptyField(event.target.value) || !notValid) {
          error.innerHTML = '';
          error.classList.remove('error_active');
        } else {
          error.innerHTML = 'Некорректный email';
          error.classList.add('error_active');
        }
      },
      false
    );
  }

  _onSubmitFailed(data) {
    const error = this._root.querySelector('.light-page__error-js');
    error.classList.add('light-page__error_active');
    error.innerHTML = `<p>${data.error}<p>`;
  }

  _onSubmit(ev) {
    ev.preventDefault();
    let wasfail = false;

    const email = this._loginForm.elements['email'];
    const password = this._loginForm.elements['password'];

    const inputs = this._loginForm.querySelectorAll('.input');
    inputs.forEach(input => {
      if (Validation.isEmptyField(input.value)) {
        const error = input.nextElementSibling;
        error.innerHTML = 'Обязательное поле';
        error.classList.add('error_active');
        wasfail = true;
      } else {
        const error = input.nextElementSibling;
        error.innerHTML = '';
        error.classList.remove('error_active');
      }
    });

    if (wasfail) {
      password.value = '';
    } else {
      const user = {
        email: email.value,
        password: password.value,
      };
      this._eventBus.triggerEvent('signIn', user);
    }
  }
}
