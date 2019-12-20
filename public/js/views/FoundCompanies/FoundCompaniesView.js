import template from './foundCompanies.pug';
import { View } from '../../modules/view';
import { Api } from '../../modules/api';

export class FoundCompaniesView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
  }

  render (companies = []) {
    this._companies = companies;
    super.render();
    this._addEventListeners(); 
    this._showCompanies();
  }

  _showCompanies() {
    console.log(this._companies);
    this._container.innerHTML = '';
    if (this._companies.length) {
      this._companies.forEach(company => {
        let c = document.createElement('div');
        c.className = 'search-company__name';
        c.innerHTML = `<a class="bloko-link" href="/employer/${company.id}">${company.company_name}</a><span font-size="16px"> активных вакансий: ${company.vacancies.length}</span?`
        this._container.appendChild(c);
      })
    } else {
        let msg = document.createElement('div');
        msg.className = 'search-company__name';
        msg.innerHTML = 'Ничего не найдено';
        this._container.appendChild(msg);
    }
  }

  _addEventListeners() {
    this._container = document.querySelector('.search-company');
    this._searchForm = document.querySelector('.search-js');
    this._searchForm.addEventListener('submit', this._onSubmit.bind(this));
  }

  _onSubmit(ev) {
    ev.preventDefault();
    let request = '/employers?';

    Array.prototype.forEach.call(this._searchForm.elements, elem => {
      if (elem.tagName == 'INPUT') {
        request += `${elem.name}=${elem.value}&`;
      }
    });  
    console.log(request);

    Api.searchCompanies(request)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res);
      }
    })
    .then(companies => {
      this._companies = companies;
      this._showCompanies();
    })
    .catch(error => {
      console.error(error);
    });
  }
}
