import {renderBase} from "../../utils/util";
import Validation from '../../modules/validation';
import {Api} from "../../modules/api";

import template from './signupemployer.pug'
import {HeaderComponent} from "../../components/Header/Header";

const errInvalidPasswordData = 'Must contain at least 8 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';

export class SignupEmployer {

    constructor(){
    }

    render(root = document.body, data = {hhRole: 'anonymous'}) {
        renderBase(root);

        const header = document.querySelector('.header');
        new HeaderComponent(header, data).render();

        const view=root.querySelector('.left-column');
        view.innerHTML = template(data);

        const signupForm = view.querySelector('.signup-form');

        const companyName = signupForm.elements['companyName'];
        const site = signupForm.elements['site'];
        const email = signupForm.elements['email'];
        const city = signupForm.elements['city'];
        const employerNumber = signupForm.elements['employerNumber'];
        const firstName = signupForm.elements['firstName'];
        const lastName = signupForm.elements['lastName'];
        const phoneNumber = signupForm.elements['phoneNumber'];
        const extraPhoneNumber = signupForm.elements['extraPhoneNumber'];
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
                    error.innerHTML = "Пароль должен иметь 8 символов, 1 цифру, 1 в верхнем и 1 в нижнем регистре"
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
                return;
            } else {
                // HTTP POST REQUEST
                const user = {
                    company_name: companyName.value,
                    site: site.value,
                    email: email.value,
                    city: city.value,
                    // empl_num: employerNumber.value,
                    first_name: firstName.value,
                    second_name: lastName.value,
                    phone_number: phoneNumber.value,
                    extra_number: extraPhoneNumber.value,
                    password: password.value
                };
                Api.signUpEmployer(user)
                    .then(r => {
                        if (r.status === 400) {
                            throw new Error("Такой пользователь уже существует!");
                        }
                        window.router.toStartPage();
                    })
                    .catch(err => {
                        alert(err.message);
                    });
            }
        }, false);
    }
}
