import template from './signupemployer.pug';
import { View } from '../../modules/view';
import Validation from '../../modules/validation';

const errInvalidPasswordData = 'Must contain at least 8 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';

export class SignupEmployerView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);
    this._eventBus.subscribeToEvent('signUpFailed', this._onSubmitFailed.bind(this));
  }

  render (data = {}) {
    super.render(data);

    this._signupForm = this._root.querySelector('.signup-form');
    this._signupForm.addEventListener('submit', this._onSubmit.bind(this), false);

    this.setValidationOnChangeListeners();
  }

  setValidationOnChangeListeners () {
    const login = this._signupForm.elements['login'];
    const password = this._signupForm.elements['password'];
    const passwordConfirm = this._signupForm.elements['passwordConfirm'];

    password.addEventListener('input', function (event) {
      const error = event.target.nextElementSibling;
      event.target.className = 'input';
      error.innerHTML = '';
      error.className = 'error';
    }, false);

    passwordConfirm.addEventListener('input', function (event) {
      const error = event.target.nextElementSibling;
      event.target.className = 'input';
      error.innerHTML = '';
      error.className = 'error';
    }, false);

    login.addEventListener('input', function (event) {
      const notValid = Validation.validateEmail(event.target.value, true);
      const error = event.target.nextElementSibling;
      if (Validation.isEmptyField(event.target.value) || !notValid) {
        event.target.className = 'input';
        error.innerHTML = '';
        // error.className = 'error';
      } else {
        event.target.className = 'input invalid ';
        error.innerHTML = 'Некорректный email';
      }
    }, false);
  }

  _onSubmitFailed (data) {
    const login = this._signupForm.querySelector('[name="login"]');
    login.classList.add('invalid');

    const error = login.nextElementSibling;
    error.innerHTML = data.error;
  }

  _onSubmit (ev) {
    ev.preventDefault();
    let wasfail = false;

    const companyName = this._signupForm.elements['companyName'];
    const site = this._signupForm.elements['site'];
    const email = this._signupForm.elements['login'];
    const city = this._signupForm.elements['city'];
    const employerNumber = this._signupForm.elements['employerNumber'];
    const firstName = this._signupForm.elements['firstName'];
    const lastName = this._signupForm.elements['lastName'];
    const phoneNumber = this._signupForm.elements['phoneNumber'];
    const extraPhoneNumber = this._signupForm.elements['extraPhoneNumber'];
    const password = this._signupForm.elements['password'];
    const passwordConfirm = this._signupForm.elements['passwordConfirm'];

    const inputs = this._signupForm.querySelectorAll('.input');
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

    if (!email.validity.valid) {
      const error = email.nextElementSibling;
      error.innerHTML = 'Неверный email!';
      error.className = 'error active';
      wasfail = true;
    }

    const testPass = Validation.validatePassword(password.value, true);
    if (testPass) {
      if (testPass === errInvalidPasswordData) {
        const error = password.nextElementSibling;
        error.innerHTML = 'Пароль должен иметь 8 символов, 1 цифру, 1 в верхнем и 1 в нижнем регистре';
        error.className = 'error active';
        password.className = 'input invalid';
        passwordConfirm.className = 'input invalid';
        wasfail = true;
      }
    } else {
      const test = Validation.validateRepass(passwordConfirm.value, password.value);
      if (test === errNotEqualPassRePass) {
        const error = passwordConfirm.nextElementSibling;
        error.innerHTML = 'Пароли не совпадают';
        error.className = 'error active';
        password.className = 'input invalid';
        passwordConfirm.className = 'input invalid';
        wasfail = true;
      }
    }
    if (wasfail) {
      passwordConfirm.value = '';
      password.value = '';

    } else {
      const user = {
        company_name: companyName.value,
        site: site.value,
        email: email.value,
        city: city.value,
        empl_num: employerNumber.value,
        first_name: firstName.value,
        second_name: lastName.value,
        phone_number: phoneNumber.value,
        extra_number: extraPhoneNumber.value,
        password: password.value
      };
      this._eventBus.triggerEvent('signUp', user);
    }
  }
}
