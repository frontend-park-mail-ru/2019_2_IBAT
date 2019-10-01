import template from './header.pug';
import {Api} from "../../modules/api";

export class HeaderComponent {
    constructor(parent = document.body, data = {}) {
        this._parent = parent;
        this._data = data;
    }

    render() {
        this._parent.innerHTML = template(this._data)

        this._parent.addEventListener('submit', (ev) => {
            if (ev.target.action.match(/\/auth/g)) {
                ev.preventDefault();
                Api.signOut()
                    .then(res => {
                        if (res.statusCode >= 300) {
                            throw new Error("Пользователь не авторизован!");
                        }
                    })
                    .then(res => {
                        window.router.toStartPage();
                    })
                    .catch(err => {
                        alert(err);
                    });
            }
        });

    }

}
