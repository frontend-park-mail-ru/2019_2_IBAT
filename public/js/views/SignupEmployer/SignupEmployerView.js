import template from './signupemployer.pug';
import { View } from '../../modules/view';
import Validation from '../../modules/validation';

export class SignupEmployerView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);
    this._eventBus.subscribeToEvent('signUpFailed', this._onSubmitFailed.bind(this));
  }

  render(data = {}) {
    super.render(data);

    this._signupForm = this._root.querySelector('.signupemp__form-js');
    this._signupForm.addEventListener('submit', this._onSubmit.bind(this), false);

    this.setValidationOnChangeListeners();
  }

  setValidationOnChangeListeners() {
    const login = this._signupForm.elements['login'];
    const inputs = this._signupForm.querySelectorAll('input');

    inputs.forEach(input => {
      input.addEventListener(
        'input',
        function(event) {
          event.target.classList.remove('input_invalid');
          const error = event.target.nextElementSibling;
          if (error != null) {
            error.innerHTML = '';
            error.classList.remove('error_active');
          }
        },
        false
      );
    });

    login.addEventListener(
      'input',
      function(event) {
        const notValid = Validation.validateEmail(event.target.value, true);
        const error = event.target.nextElementSibling;
        if (Validation.isEmptyField(event.target.value) || !notValid) {
          event.target.classList.remove('input_invalid');
          error.innerHTML = '';
          error.classList.remove('error_active');
        } else {
          event.target.classList.add('input_invalid');
          error.innerHTML = 'Некорректный email';
          error.classList.add('error_active');
        }
      },
      false
    );
  }

  _onSubmitFailed(data) {
    const message = this._root.querySelector('.light-page__error-js');
    message.classList.add('light-page__error_active');
    message.innerHTML = `<p>${data.error}<p>`;
  }

  _onSubmit(ev) {
    ev.preventDefault();
    let wasfail = false;
    let hasEmptyField = false;
    const companyName = this._signupForm.elements['companyName'];
    const site = this._signupForm.elements['site'];
    const email = this._signupForm.elements['login'];
    const city = this._signupForm.elements['city'];
    const firstName = this._signupForm.elements['firstName'];
    const lastName = this._signupForm.elements['secondName'];
    const phoneNumber = this._signupForm.elements['phoneNumber'];
    const extraPhoneNumber = this._signupForm.elements['extraPhoneNumber'];
    const password = this._signupForm.elements['pass'];
    const passwordConfirm = this._signupForm.elements['repass'];

    const inputs = this._signupForm.querySelectorAll('.input');
    inputs.forEach(input => {
      if (Validation.isEmptyField(input.value)) {
        input.classList.add('input_invalid');
        wasfail = true;
        hasEmptyField = true;
      } else {
        input.classList.remove('input_invalid');
      }
    });

    if (!email.validity.valid) {
      const error = email.nextElementSibling;
      error.innerHTML = 'Неверный email!';
      error.classList.add('error_active');
      wasfail = true;
    }

    const testPass = Validation.validateRepass(passwordConfirm.value, password.value);
    if (testPass) {
      const error = password.nextElementSibling;
      error.innerHTML = testPass;
      error.classList.add('error_active');
      password.classList.add('input_invalid');
      passwordConfirm.classList.add('input_invalid');
      wasfail = true;
    }
    if (wasfail) {
      const message = this._root.querySelector('.light-page__error-js');
      if (hasEmptyField) {
        message.classList.add('light-page__error_active');
        message.innerHTML = 'Заполните обязательные поля';
      } else {
        message.classList.remove('light-page__error_active');
        message.innerHTML = '';
      }
      passwordConfirm.value = '';
      password.value = '';
    } else {
      const user = {
        company_name: companyName.value,
        site: site.value,
        email: email.value,
        city: city.value,
        first_name: firstName.value,
        second_name: lastName.value,
        phone_number: phoneNumber.value,
        extra_number: extraPhoneNumber.value,
        password: password.value,
      };
      this._eventBus.triggerEvent('signUp', user);
    }
  }
}
