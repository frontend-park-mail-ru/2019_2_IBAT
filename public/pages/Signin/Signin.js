import {renderBase} from "../../utils/util";
import Validation from '../../modules/validation';
import {Api} from "../../modules/api";

import template from './signin.pug'
import {HeaderComponent} from "../../components/Header/Header";

const errInvalidPasswordData = 'Must contain at least 8 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';

export class SignIn {

    constructor() {
    }

    render(root = document.body, data = {hhRole: 'anonymous'}) {
        renderBase(root);

        root.className='page';
        const header = root.querySelector('.header');
        new HeaderComponent(header, data).render();

        const view = document.createElement('div');
        view.className = 'content';
        view.innerHTML = template(data);
        root.appendChild(view);

        const errInvalidPasswordData = 'Must contain at least 8 chars';

        let loginForm = root.querySelector('.login__form');

        let password = loginForm.elements['password'];
        let email = loginForm.elements['email'];
        let errorMsg = loginForm.querySelector('.error-msg');

        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let wasfail = false;

            let inputs = loginForm.querySelectorAll('.input');
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
                    input.className = "input";
                }
            });

            if (wasfail) {
                password.value = "";
            } else {
                const user={
                   login: email.value,
                   password: password.value
                };
                Api.signIn(user)
                    .then(res=>{
                        if(res.status===400){
                            throw new Error("Неверный пароль")
                        }
                    })
                    .then(res=>{
                       window.router.toStartPage();
                    })
                    .catch(err=>{
                        console.log(err);
                        alert(err);
                    });
            }
        }, false);
    }
}
