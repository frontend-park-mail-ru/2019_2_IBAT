import  Validation  from './validation.js';

const errInvalidPasswordData = 'Must contain at least 8 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';

let file = document.querySelector('.upload');
let avatar = document.querySelector('.thumb');

function handleFileSelect(event) {
    let file = event.target.files[0];

    let reader = new FileReader();

    avatar.title = file.name;

    reader.onload = function(event) {
        avatar.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

file.addEventListener("change", handleFileSelect ,false)