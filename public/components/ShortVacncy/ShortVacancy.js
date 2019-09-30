import template from './ShortVacancy.pug'

export class ShortVacancyComponent{
    constructor (parent = document.body, data = {}) {
        this._parent = parent;
        this._data = data;
    }

    render () {
        let vacancy = document.createElement('div');
        vacancy.innerHTML = template(this._data)
        this._parent.appendChild(vacancy);
    }
}