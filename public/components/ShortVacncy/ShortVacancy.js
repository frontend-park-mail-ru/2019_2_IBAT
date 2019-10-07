import template from './shortVacancy.pug';

export class ShortVacancyComponent{
    constructor (data = {}) {
        this._data = data;

        this._vacancy = document.createElement('div');
        this._vacancy.className='short-vacancy';
        this._vacancy.innerHTML = template(this._data);
    }

    appendToList(list) {
        list.appendChild(this._vacancy);
    }
}
