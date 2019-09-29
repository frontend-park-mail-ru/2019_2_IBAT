import  Validation  from './validation.js';

const errInvalidPasswordData = 'Must contain at least 8 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';

let profile = document.querySelector('.profile-form')
let file = profile.querySelector('.upload');
let avatar = profile.querySelector('.thumb');
let email = profile.querySelector('.email');
let password = profile.querySelector('.password');
let passwordConfirm = profile.querySelector('.passwordConfirm');


email.addEventListener("input", function(event) {
    let err = Validation.validateEmail(email.value, true);
    let error = email.nextElementSibling;
    if (Validation.isEmptyField(email.value) || !err) {
        email.className = "input";
        error.innerHTML = "";
        error.classNamem = "error";
    } else {
        email.className = "input invalid ";
        error.innerHTML = "Неверный email";
    }
}, false);

function handleFileSelect(event) {
    let file = event.target.files[0];
    let errMsg = avatar.nextElementSibling;

    let err = Validation.validateAvatar(file);
    if (err) {
        errMsg.innerHTML = err;
    } else {
        errMsg.innerHTML = "";
        let reader = new FileReader();

        avatar.title = file.name;
    
        reader.onload = function(event) {
            avatar.src = event.target.result;
        };
    
        reader.readAsDataURL(file);
    } 
}

file.addEventListener("change", handleFileSelect ,false)

profile.addEventListener("submit", function(event) {
    event.preventDefault();
    let wasfail = false;

    if (!email.validity.valid) {
        let error = email.nextElementSibling;
        error.innerHTML = "Неверный email!"
        error.className = "error active"
        wasfail = true;
    } else {
        let error = email.nextElementSibling;
        email.className = "input";
        error.innerHTML = "";
        error.classNamem = "error";
    }

    let testPass = Validation.validatePassword(password.value, true);
    if (testPass) {
        if (testPass === errInvalidPasswordData) {
            let error = password.nextElementSibling;
            error.innerHTML = "Пароль должен иметь 8 символов, 1 цифру, 1 в верхнем и 1 в нижнем регистре"
            error.className = "error active";
            password.className = "input invalid"
            passwordConfirm.className = "input invalid"
            wasfail = true;
        }
    } else {
        let test = Validation.validateRepass(passwordConfirm.value, password.value);
        if (test === errNotEqualPassRePass) {
            let error = passwordConfirm.nextElementSibling;
            error.innerHTML = "Пароли не совпадают";
            error.className = "error active";
            password.className = "input invalid"
            passwordConfirm.className = "input invalid"
            wasfail = true;
        }
    }
    if (wasfail) {
        passwordConfirm.value = "";
        password.value = "";
        return;
    } else {
        // HTTP POST REQUEST
    }
}, false);