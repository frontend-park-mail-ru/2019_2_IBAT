import {renderBase} from "../../utils/util";
import Validation from '../../modules/validation';
import {Api} from "../../modules/api";

import template from './CreateVacancy.pug'
import {HeaderComponent} from "../../components/Header/Header";

export class CreateVacancy {

    constructor(router){
        this._router=router;
    }

    render(root = document.body, data = {hhRole: 'anonymous'}) {
        renderBase(root);
        const header = document.querySelector('.header');
        new HeaderComponent(header, data).render();

        const view=root.querySelector('.left-column');
        view.innerHTML = template(data);

        const resumeForm = view.querySelector('.resume-form');

        const companyName = resumeForm.elements['company-name'];
        const profession = resumeForm.elements['profession'];
        const position = resumeForm.elements['position'];
        const experience = resumeForm.elements['experience'];
        const wage = resumeForm.elements['wage'];
        const about = resumeForm.elements['about'];

        resumeForm.addEventListener("submit", function (event) {
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

            if (wasfail) {

            } else {
                // HTTP POST REQUEST
                const vacancy = {
                    company_name: companyName.value,
                    profession: profession.value,
                    position: position.value,
                    experience: experience.value,
                    wage: wage.value,
                    about: about.value,
                };

                Api.createVacancy(vacancy)
                    .then(r => {
                        if (r.status === 400) {
                            throw new Error("Такой пользователь уже существует!");
                        }
                        this._router.toStartPage();
                    })
                    .catch(err => {
                        alert(err.message);
                    });
            }
        }, false);
    }
}