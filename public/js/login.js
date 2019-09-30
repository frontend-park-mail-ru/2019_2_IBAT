// import  Validation  from './validation.js';

const errInvalidPasswordData = 'Must contain at least 8 chars';

let loginForm = document.querySelector('.login__form');
let password = loginForm.querySelector('.password')
let errormsg = loginForm.querySelector('.error-msg');

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let wasfail = false;

    let inputs = loginForm.querySelectorAll('.input');
    inputs.forEach(input => {
        if (Validation.isEmptyField(input.value)) {
            let error = input.nextElementSibling;
            error.innerHTML = "Обязательное поле"
            error.className = "error active"
            input.className = "input invalid"
            wasfail = true;
        } else {
            let error = input.nextElementSibling;
            error.innerHTML = ""
            error.className = "error"
            input.className = "input"
        }
    });
    
    if (wasfail) {
        password.value = "";
        return;
    } else {
        // HTTP POST REQUEST
    }
}, false);