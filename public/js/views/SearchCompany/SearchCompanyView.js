import template from './searchCompanyPage.pug';
import { View } from '../../modules/view';
import { COMPANY } from '../../modules/events';

export class SearchCompanyView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._globalEventBus.subscribeToEvent(COMPANY.searchSuccess, this._onFounedCompanies.bind(this));
  }

  _onSubmit (ev) {
    ev.preventDefault();
    let input = document.querySelector('.input');
    this._globalEventBus.triggerEvent(COMPANY.search, input.value);
  }

  _onFounedCompanies (companies = []) {
    let container = document.querySelector('.search-company');
    container.innerHTML = '';
    if (companies.length) {
        companies.forEach(company => {
            let c = document.createElement('div');
            c.className = 'search-company__name';
            c.innerHTML = `<a class="bloko-link" href="/employer/${company.id}">${company.name}</a>`
            container.appendChild(c);
        })
    } else {
        let msg = document.createElement('div');
        msg.className = 'search-company__name';
        msg.innerHTML = 'Ничего не найдено';
        container.appendChild(msg);
    }
  }

  render(data = {}) {
    super.render(data);
    const button = document.querySelector('.button');
    button.addEventListener('click', this._onSubmit.bind(this), false);
  }
}
