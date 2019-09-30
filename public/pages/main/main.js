import {renderBase} from "../../utils/util";
import {Api} from '../../modules/api.js';
import {HeaderComponent} from '../../components/Header/Header.js';
import {SignupMenuComponent} from "../../components/SignupMenu/SignupMenu";

export class MainPage {
    constructor(router) {
        this._router=router;
        this._checkSession();
    }

    _checkSession() {
        Api.checkSession()
            .then(response => {
                if (response.status >= 300) {
                    throw new Error("Неверный статус");
                }
                response.json();
            })
            .then(data => {
                this.render(undefined, data);
            })
            .catch(err => {
                if (err.status === 400) {
                    this.render(undefined, {hhRole: 'anonymous'});
                } else {
                    console.error(err);
                }
            });
    }

    render(root = document.body, data = {hhRole: 'anonymous'}) {
        renderBase(root);
        const header = document.querySelector('.header');
        new HeaderComponent(header, data).render();

        const rightColumn = document.querySelector('.right-column');
        new SignupMenuComponent(rightColumn, data).render();
    }
}