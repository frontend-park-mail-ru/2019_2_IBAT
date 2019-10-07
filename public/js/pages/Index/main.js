import { renderBase } from '../../../utils/util';
import { Api } from '../../modules/api.js';
import { HeaderComponent } from '../../../components/Header/Header.js';
import { SignupMenuComponent } from '../../../components/SignupMenu/SignupMenu';
import { ShortVacancyComponent } from '../../../components/ShortVacncy/ShortVacancy';

export class MainPage {
    constructor() {
    }

    _postRender(root, data){
        renderBase(root);
        const header = document.querySelector('.header');
        new HeaderComponent(header, data).render();

        const rightColumn = document.querySelector('.right-column');
        new SignupMenuComponent(rightColumn, data).render();

        if (data.hhRole === 'anonymous' || data.hhRole === 'seeker') {
            const leftColumn = document.querySelector('.left-column');
            Api.getVacancies()
                .then(function(response) {
                    if (response.status >= 300) {
                        throw new Error("Неверный статус");
                    }
                    return response.json();
                })
                .then(vacancies => {
                    let list = document.createElement("div");
                    list.style.display = 'flex';
                    list.style.flexDirection = 'column';
                    list.style.maxWidth = '600px';
                    leftColumn.appendChild(list);

                    if (vacancies) {
                        for (let vacancy in vacancies) {
                            new ShortVacancyComponent(list, vacancies[vacancy]).render();
                        }
                    }
                })
        }
    }

    render(root = document.body, data = {hhRole: 'anonymous'}) {
        Api.checkSession()
            .then(response => {
                if (response.status === 401) {
                    throw new Error("error");
                }
                return response.json();
            })
            .then(data => {
                data.hhRole=data.class;
                this._postRender(root, data);
            })
            .catch(err=>{
                this._postRender(root, {hhRole: 'anonymous'});
            })
    }
}
