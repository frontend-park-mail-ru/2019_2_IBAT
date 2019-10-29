import template from './signupseeker.pug';
import { View } from '../../modules/view';
import Validation from '../../modules/validation';

const errInvalidPasswordData = 'Must contain at least 8 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';

export class SignupSeekerView extends View {
  constructor(root, eventBus) {
    super(root, template, eventBus);
    this._eventBus.subscribeToEvent('signUpFailed', this._onSubmitFailed.bind(this));
  }

  render(data = {}) {
    super.render(data);

    this._signupForm = this._root.querySelector('.signup-form');
    this._signupForm.addEventListener('submit', this._onSubmit.bind(this), false);

    this.setValidationOnChangeListeners();
  }

  setValidationOnChangeListeners() {
    const login = this._signupForm.elements['login'];
    const password = this._signupForm.elements['password'];
    const passwordConfirm = this._signupForm.elements['passwordConfirm'];

    
    password.addEventListener(
      'input',
      function(event) {
        let error = event.target.nextElementSibling;
        View._removeInputError(event.target, error);
      },
      false
    );

    passwordConfirm.addEventListener(
      'input',
      function(event) {
        let error = event.target.nextElementSibling;
        View._removeInputError(event.target, error);
      },
      false
    );

    login.addEventListener(
      'input',
      function(event) {
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

  _onSubmitFailed(data) {
    const login = this._signupForm.querySelector('[name="login"]');
    const error = login.nextElementSibling;
    View._addInputError(login, error, data.error);
  }

  _onSubmit(ev) {
    ev.preventDefault();
    let wasfail = false;

    const firstName = this._signupForm.elements['firstName'];
    const lastName = this._signupForm.elements['lastName'];
    const email = this._signupForm.elements['login'];
    const password = this._signupForm.elements['password'];
    const passwordConfirm = this._signupForm.elements['passwordConfirm'];

    let inputs = this._signupForm.querySelectorAll('.input');

    wasfail = View._validateObligotaryInputs(inputs);

    if (!email.validity.valid) {
      let error = email.nextElementSibling;
      View._addInputError(email, error,'Неверный email!');
      wasfail = true;
    }

    let testPass = Validation.validatePassword(password.value, true);
    if (testPass) {
      if (testPass === errInvalidPasswordData) {
        let error = password.nextElementSibling;
        View._addInputError(password, error,'Пароль должен иметь 8 символов, 1 цифру, 1 в верхнем и 1 в нижнем регистре');
        View._addInputError(passwordConfirm);
        wasfail = true;
      }
    } else {
      let test = Validation.validateRepass(passwordConfirm.value, password.value);
      if (test === errNotEqualPassRePass) {
        let error = passwordConfirm.nextElementSibling;
        View._addInputError(password, error, 'Пароли не совпадают');
        View._addInputError(password);
        wasfail = true;
      }
    }
    if (wasfail) {
      passwordConfirm.value = '';
      password.value = '';
    } else {
      let user = {
        email: email.value,
        first_name: firstName.value,
        //TODO выполнить унификацию lastName(фронтенд) и second_name(бэкенд)
        second_name: lastName.value,
        password: password.value,
      };
      this._eventBus.triggerEvent('signUp', user);
    }
  }
}
