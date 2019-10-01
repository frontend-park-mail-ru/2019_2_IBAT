import {renderBase} from "../../utils/util";
import Validation from '../../modules/validation';
import {Api} from "../../modules/api";

import template from './signupseeker.pug'
import {HeaderComponent} from "../../components/Header/Header";

const errInvalidPasswordData = 'Must contain at least 8 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';

export class SignupSeeker {

    constructor(){
    }

    render(root = document.body, data = {hhRole: 'anonymous'}) {
        renderBase(root);

        const header = document.querySelector('.header');
        new HeaderComponent(header, data).render();

        const view=root.querySelector('.left-column');
        view.innerHTML = template(data);

        const signupForm = view.querySelector('.signup-form');

        const firstName = signupForm.elements['firstName'];
        const lastName = signupForm.elements['lastName'];
        const email = signupForm.elements['login'];
        const password = signupForm.elements['Password'];
        const passwordConfirm = signupForm.elements['PasswordConfirm'];

        password.addEventListener("input", function (event) {
            let error = password.nextElementSibling;
            password.className = "input";
            error.innerHTML = "";
            error.className = "error";
        }, false);

        passwordConfirm.addEventListener("input", function (event) {
            let error = passwordConfirm.nextElementSibling;
            passwordConfirm.className = "input";
            error.innerHTML = "";
            error.className = "error";
        }, false);

        email.addEventListener("input", function (event) {
            let notValid = Validation.validateEmail(email.value, true);
            let error = email.nextElementSibling;
            if (Validation.isEmptyField(email.value) || !notValid) {
                email.className = "input";
                error.innerHTML = "";
                error.classNamem = "error";
            } else {
                email.className = "input invalid ";
                error.innerHTML = "Неверный email";
            }
        }, false);

        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let wasfail = false;

            let inputs = signupForm.querySelectorAll('.input');
            inputs.forEach(input => {
                if (Validation.isEmptyField(input.value)) {
                    let error = input.nextElementSibling;
                    error.innerHTML = "Обязательное поле";
                    error.className = "error active";
                    input.className = "input invalid";
                    wasfail = true;
                } else {
                    let error = input.nextElementSibling;
                    error.innerHTML = "";
                    error.className = "error";
                    input.className = "input"
                }
            });

            if (!email.validity.valid) {
                let error = email.nextElementSibling;
                error.innerHTML = "Неверный email!";
                error.className = "error active";
                wasfail = true;
            }

            let testPass = Validation.validatePassword(password.value, true);
            if (testPass) {
                if (testPass === errInvalidPasswordData) {
                    let error = password.nextElementSibling;
                    error.innerHTML = "Пароль должен иметь 8 символов, 1 цифру, 1 в верхнем и 1 в нижнем регистре";
                    error.className = "error active";
                    password.className = "input invalid";
                    passwordConfirm.className = "input invalid";
                    wasfail = true;
                }
            } else {
                let test = Validation.validateRepass(passwordConfirm.value, password.value);
                if (test === errNotEqualPassRePass) {
                    let error = passwordConfirm.nextElementSibling;
                    error.innerHTML = "Пароли не совпадают";
                    error.className = "error active";
                    password.className = "input invalid";
                    passwordConfirm.className = "input invalid";
                    wasfail = true;
                }
            }
            if (wasfail) {
                passwordConfirm.value = "";
                password.value = "";

            } else {
                // HTTP POST REQUEST
                const user = {
                    email: email.value,
                    first_name: firstName.value,
                    //TODO выполнить унификацию lastName(фронтенд) и second_name(бэкенд)
                    second_name: lastName.value,
                    password: password.value
                };
                Api.signUpSeeker(user)
                    .then(res => {
                        if (res.status >= 300) {
                            return res.json();
                        }
                    })
                    .then(err => {
                        console.error(err);
                        alert(err);
                    });
            }
        }, false);
    }
}
