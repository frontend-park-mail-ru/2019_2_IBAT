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
    let data = {};
    Array.prototype.forEach.call(this._searchForm.elements, elem => {
      if (elem.tagName == 'SELECT' || elem.tagName == 'INPUT') {
        data[elem.name] = elem.value;
      }
    });
    this._globalEventBus.triggerEvent(COMPANY.search, data);
  }

  _onFounedCompanies (companies = []) {
    this._companies = companies;
    this._showCompanies()
  }

  render(data = {}) {
    super.render(data);
    this._searchForm = this._root.querySelector('.search');
    const button = document.querySelector('.button');
    button.addEventListener('click', this._onSubmit.bind(this), false);
    if(this._companies) {
      this._showCompanies()
    } 
  }

  _showCompanies() {
    console.log(this._companies);
    let container = document.querySelector('.search-company');
    container.innerHTML = '';
    if (this._companies.length) {
      this._companies.forEach(company => {
        let c = document.createElement('div');
        c.className = 'search-company__name';
        c.innerHTML = `<a class="bloko-link" href="/employer/${company.id}">${company.company_name}</a><span> ${company.vacancies.length}</span?`
        container.appendChild(c);
      })
    } else {
        let msg = document.createElement('div');
        msg.className = 'search-company__name';
        msg.innerHTML = 'Ничего не найдено';
        container.appendChild(msg);
    }
  }
}
