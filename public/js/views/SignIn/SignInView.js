import template from './signin.pug';
import { View } from '../../modules/view';
import Validation from '../../modules/validation';
import { AUTH } from '../../modules/events';

export class SignInView extends View {
  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
    this._globalEventBus.subscribeToEvent(AUTH.signInFailed, this._onSubmitFailed.bind(this));
  }

  render (data = {}) {
    super.render(data);

    this._loginForm = this._root.querySelector('.login__form-js');
    this._loginForm.addEventListener('submit', this._onSubmit.bind(this), false);

    this.setValidationListeners();
  }

  setValidationListeners () {
    const email = this._loginForm.elements['email'];

    email.addEventListener(
      'input',
      function (event) {
        let notValid = Validation.validateEmail(event.target.value, true);
        let error = event.target.nextElementSibling;
        if (Validation.isEmptyField(event.target.value) || !notValid) {
          View._removeInputError(event.target, error);
        } else {
          View._addInputError(event.target, error, 'Некорректный email');
        }
      },
      false
    );
  }

  _onSubmitFailed (data) {
    let error = this._root.querySelector('.light-page__error-js');
    error.classList.add('light-page__error_active');
    error.innerHTML = `<p>${data.error}<p>`;
  }

  _onSubmit (ev) {
    ev.preventDefault();
    let wasfail = false;

    const email = this._loginForm.elements['email'];
    const password = this._loginForm.elements['password'];

    let inputs = this._loginForm.querySelectorAll('.input');
    wasfail = View._validateObligotaryInputs(inputs);

    if (wasfail) {
      password.value = '';
    } else {
      const user = {
        email: email.value,
        password: password.value,
      };
      this._globalEventBus.triggerEvent(AUTH.signIn, user);
    }
  }
}
